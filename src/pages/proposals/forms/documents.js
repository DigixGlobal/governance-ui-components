/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from 'react-responsive-modal';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';

import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';

import { sendTransactionToDaoServer } from '@digix/gov-ui/reducers/dao-server/actions';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { dijixImageConfig, dijixPdfConfig, dijix } from '@digix/gov-ui/utils/dijix';
import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';
import { encodeHash } from '@digix/gov-ui/utils/helpers';
import Dao from '@digix/dao-contracts/build/contracts/Dao.json';
import getContract from '@digix/gov-ui/utils/contracts';
import Spinner from '@digix/gov-ui/components/common/blocks/loader/spinner';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';

import {
  CallToAction,
  Heading,
  Header,
  Centered,
} from '@digix/gov-ui/pages/proposals/forms/base-style';

import {
  Fieldset,
  FormItem,
  Label,
  MediaUploader,
  Document,
  Enlarge,
  ImageItem,
  ImageHolder,
  ErrorNotifications,
  Delete,
  AddMoreButton,
  Note,
  ModalCta,
} from '@digix/gov-ui/pages/proposals/forms/style';

import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';

import { BackButton } from '@digix/gov-ui/pages/proposals/style';

registerUIs({ txVisualization: { component: TxVisualization } });

const network = SpectrumConfig.defaultNetworks[0];
class Documents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [{}],
      uploading: false,
      uploadError: undefined,
      selectedImage: undefined,
    };
  }

  handleRemove = index => () => {
    const { documents } = this.state;
    documents.splice(index, 1);
    this.setState({ documents: [...documents] });
  };

  handleAddMore = () => {
    const { documents } = this.state;
    documents.push({});
    this.setState({ documents: [...documents] });
  };

  handleUpload = i => e => {
    const { documents } = this.state;
    const {
      translations: { project },
    } = this.props;

    const { accept } = e.target;
    const supported = [];
    let error;
    this.setState({ uploadError: false });

    accept.split(',').forEach(item => {
      if (item === 'image/*') {
        supported.push('image/png');
        supported.push('image/jpeg');
      }
      if (item === '.pdf') supported.push('application/pdf');
      else supported.push(item);
    });

    if (e.target.files.length > 0) {
      const thumbs = [];
      const files = [];
      Array.from(e.target.files).map(file => {
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 10) {
          this.setState({ uploadError: project.uploadImageButtonHelpText });
          return undefined;
        }
        const proofsArray = [];
        const reader = new FileReader();
        reader.onloadend = () => {
          const { result } = reader;

          if (supported.findIndex(item => item === file.type) === -1) {
            error = `Unsupported ${file.type} file type`;
            this.setState({ uploadError: error });
            return;
          }

          if (file.type === 'image/png' || file.type === 'image/jpeg') {
            thumbs.push({
              fileType: file.type,
              src: result,
              name: file.name,
              index: thumbs.length > 0 ? thumbs.length - 1 : 0,
            });

            proofsArray.push({
              type: 'image',
              src: result.toString(),
              base64: result.toString(),
              index: proofsArray.length > 0 ? proofsArray.length - 1 : 0,
              embed: 'imageKey',
              ...dijixImageConfig,
            });
          }

          if (file.type === 'application/pdf') {
            files.push({ fileType: file.type, src: result, name: file.name });
            proofsArray.push({
              type: 'pdf',
              src: file,
              base64: result.toString(),
              index: proofsArray.length > 0 ? proofsArray.length - 1 : 0,
              embed: 'pdfKey',
              ...dijixPdfConfig,
            });
          }
          documents[i] = { ...proofsArray[0] };
          this.setState({ documents });
        };
        reader.readAsDataURL(file);

        return proofsArray;
      });
    }
  };

  createAttestation() {
    this.setState({ uploading: true });
    const { documents } = this.state;
    return Promise.all(
      documents.map((doc, i) => {
        const { type, src, fileName, config } = doc;
        return dijix
          .create(type, { src, name: `Document ${i + 1}`, fileName, ...config })
          .then(({ ipfsHash }) => ipfsHash);
      })
    ).then(hashes =>
      dijix
        .create('attestation', {
          attestation: {
            moreDocs: {
              docs: hashes,
              created: Date.now(),
            },
          },
        })
        .then(({ ipfsHash }) => encodeHash(ipfsHash))
    );
  }

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  handleSubmit = () => {
    const {
      web3Redux,
      ChallengeProof,
      addresses,
      gasLimitConfig,
      translations: {
        snackbar: { snackbars },
      },
      match: {
        params: { id: proposalId },
      },
    } = this.props;

    this.createAttestation().then(hash => {
      this.setState({ uploading: false }, () => {
        const { abi, address } = getContract(Dao, network);
        const contract = web3Redux
          .web3(network)
          .eth.contract(abi)
          .at(address);

        const ui = {
          caption: snackbars.addDocs.title,
          header: snackbars.addDocs.txUiHeader,
          type: 'txVisualization',
        };

        const web3Params = {
          gasPrice: DEFAULT_GAS_PRICE,
          gas: gasLimitConfig.ADD_PROPOSAL_DOC || gasLimitConfig.DEFAULT,
          ui,
        };

        const sourceAddress = addresses.find(({ isDefault }) => isDefault);

        const onTransactionAttempt = txHash => {
          if (ChallengeProof.data) {
            this.props.sendTransactionToDaoServer({
              txHash,
              title: snackbars.addDocs.title,
              token: ChallengeProof.data['access-token'],
              client: ChallengeProof.data.client,
              uid: ChallengeProof.data.uid,
            });
          }
        };

        const onTransactionSuccess = txHash => {
          this.props.showHideAlert({
            message: snackbars.addDocs.message,
            txHash,
          });

          this.props.history.push('/');
        };

        const payload = {
          address: sourceAddress,
          contract,
          func: contract.addProposalDoc,
          params: [proposalId, hash],
          onFailure: this.setError,
          onFinally: txHash => onTransactionAttempt(txHash),
          onSuccess: txHash => onTransactionSuccess(txHash),
          network,
          web3Params,
          ui,
          showTxSigningModal: this.props.showTxSigningModal,
          translations: this.props.translations.signTransaction,
        };
        return executeContractFunction(payload);
      });
    });
  };

  handleBackToProject = () => {
    const {
      history,
      match: {
        params: { id },
      },
    } = this.props;
    history.push(`/proposals/${id}`);
  };

  renderDocuments = (document, index) => {
    if (!document) return null;

    return (
      <ImageItem addUpdates>
        <Delete kind="text" data-digix="REMOVE-BUTTON" onClick={this.handleRemove(index)}>
          <Icon kind="trash" />
        </Delete>

        {document.type && (
          <Enlarge
            kind="text"
            onClick={this.showHideImage({
              source: document.base64,
              type: document.type,
            })}
          >
            <Icon kind="magnifier" />
          </Enlarge>
        )}

        <Document
          onClick={this.showHideImage({
            source: document.base64,
            type: document.type,
          })}
          style={{ cursor: 'pointer' }}
        >
          {!document.type && null}
          {document.type && document.type === 'image' && (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img src={document.base64} data-digix={`document-${index}`} />
          )}
          {document.type && document.type === 'pdf' && (
            <PDFViewer file={document.base64} data-digix={`document-${index}`} showNav={false} />
          )}
        </Document>
      </ImageItem>
    );
  };

  renderUploadForm = () => {
    const { documents, uploadError } = this.state;
    const {
      translations: { project },
    } = this.props;
    return documents.map((_, index) => (
      <FormItem key={`item-${index + 1}`}>
        <Label>
          {project.document} {index + 1}
        </Label>
        <MediaUploader>
          <div>
            <Button
              kind="upload"
              accept="image/*,.pdf"
              primary
              fluid
              large
              id={`image-upload-${index}`}
              type="file"
              data-digix="UPLOAD-ADDITIONAL-DOCUMENT"
              caption={project.uploadDocument}
              onChange={this.handleUpload(index)}
            />
            {!uploadError && <Note>{project.uploadImageButtonHelpText}</Note>}
            {uploadError && <ErrorNotifications error>{uploadError}</ErrorNotifications>}
          </div>

          <ImageHolder>{this.renderDocuments(documents[index], index)}</ImageHolder>
        </MediaUploader>
      </FormItem>
    ));
  };

  render() {
    const { documents, uploading, open, selectedImage } = this.state;
    const {
      translations: {
        common: { proposalErrors, buttons },
        sidebar,
      },
    } = this.props;

    const hasDocs = documents.length > 0 && documents[0].type !== undefined;

    if (uploading) return <Spinner translations={this.props.translations} />;
    return (
      <Fragment>
        <BackButton
          kind="text"
          data-digix="BACK-TO-PROJECT"
          secondary
          onClick={this.handleBackToProject}
        >
          {proposalErrors.returnToProject}
        </BackButton>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <Header>
          <Heading>{buttons.addUpdates || 'Add Updates'}</Heading>
          <CallToAction>
            <Button
              primary
              disabled={!hasDocs}
              data-digix="CONFIRM-ADD-MORE-DOCS"
              onClick={this.handleSubmit}
            >
              {buttons.add || 'Add'}
            </Button>
          </CallToAction>
        </Header>

        <Fieldset>
          {this.renderUploadForm()}
          <FormItem>
            <Centered>
              <AddMoreButton kind="text" data-digix="ADD-MORE-DOCS" onClick={this.handleAddMore}>
                <Icon kind="plus" />
                {buttons.addMmore || 'Add More'}
              </AddMoreButton>
            </Centered>
          </FormItem>
        </Fieldset>
        <Modal
          open={open}
          onClose={this.showHideImage()}
          showCloseIcon={false}
          styles={{
            modal: { maxWidth: '45%', width: '100%' },
          }}
        >
          {selectedImage && (
            <ImageItem preview>
              {selectedImage.type === 'image' ? (
                <img alt="" style={{ width: '100%' }} src={selectedImage.source} />
              ) : (
                <PDFViewer file={selectedImage.source} />
              )}
            </ImageItem>
          )}

          <ModalCta>
            <Button primary invert data-digix="CLOSE-IMAGE-MODAL" onClick={this.showHideImage()}>
              {sidebar.close}
            </Button>
          </ModalCta>
        </Modal>
      </Fragment>
    );
  }
}

const { object, func, array } = PropTypes;

Documents.propTypes = {
  translations: object.isRequired,
  web3Redux: object.isRequired,
  history: object.isRequired,
  ChallengeProof: object.isRequired,
  gasLimitConfig: object,
  showHideAlert: func.isRequired,
  sendTransactionToDaoServer: func.isRequired,
  showTxSigningModal: func.isRequired,
  match: object.isRequired,
  addresses: array.isRequired,
};

Documents.defaultProps = {
  gasLimitConfig: undefined,
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  ChallengeProof: state.daoServer.ChallengeProof,
  gasLimitConfig: state.infoServer.TxConfig.data.gas,
  translations: state.daoServer.Translations.data,
});

export default web3Connect(
  connect(
    mapStateToProps,
    { showHideAlert, sendTransactionToDaoServer, showTxSigningModal }
  )(Documents)
);
