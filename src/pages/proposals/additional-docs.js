import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-responsive-modal';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';
import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';
import { dijix } from '@digix/gov-ui/utils/dijix';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { Content, SubTitle, ImageHolder, ImageItem } from '@digix/gov-ui/pages/proposals/style';

export default class AdditionalDocs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      selectedImage: undefined,
      open: false,
    };
  }
  componentWillMount = () => {
    const {
      proposal: {
        data: { proposalVersions },
      },
    } = this.props;
    const latestVersion = proposalVersions[proposalVersions.length - 1];
    const { moreDocs } = latestVersion;

    const moreDocsReducer = (acc, currentValue) => {
      if (!currentValue.docs) return undefined;
      const data = currentValue.docs.map(d => d);
      acc.push({ docs: data, created: currentValue.created });
      return acc;
    };

    const ipfs = moreDocs.reduce(moreDocsReducer, []);

    try {
      if (ipfs) {
        return Promise.all(
          ipfs.map(d => fetchImages(d.docs).then(file => ({ file, created: d.created })))
        ).then(files => this.setState({ files }));
      }
    } catch (error) {
      // do nothing
    }
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  render() {
    const {
      translations: { project, sidebar },
      proposal: {
        data: { proposalVersions },
      },
    } = this.props;
    const { files, selectedImage } = this.state;
    const latestVersion = proposalVersions[proposalVersions.length - 1];
    const { moreDocs } = latestVersion;

    if (!moreDocs || moreDocs.length === 0) return null;
    return (
      <Content>
        <SubTitle>{project.updates || 'Updates'}</SubTitle>
        <ImageHolder>
          {files.map(data =>
            data.file.map((f, i) => {
              const source = `${dijix.config.httpEndpoint}/${f.src}`;
              if (f.type === 'image') {
                return (
                  <ImageItem
                    key={`img-${i + 1}`}
                    onClick={this.showHideImage({ src: source, type: f.type })}
                  >
                    <img src={source} alt="" style={{ cursor: 'pointer' }} />
                  </ImageItem>
                );
              } else if (f.type === 'pdf')
                return (
                  <ImageItem
                    key={`pdf-${i + 1}`}
                    style={{ cursor: 'pointer' }}
                    onClick={this.showHideImage({ src: source, type: f.type })}
                  >
                    <PDFViewer file={source} />
                  </ImageItem>
                );

              return null;
            })
          )}
        </ImageHolder>
        <Modal
          open={this.state.open}
          onClose={this.showHideImage()}
          showCloseIcon={selectedImage && selectedImage.type !== 'pdf'}
        >
          <div>
            {selectedImage && selectedImage.type === 'image' && (
              <img alt="" style={{ width: '100%' }} src={selectedImage.src} />
            )}
            {selectedImage && selectedImage.type === 'pdf' && (
              <PDFViewer file={selectedImage.src} />
            )}
            <Button kind="round" onClick={this.showHideImage()}>
              {sidebar.close}
            </Button>
          </div>
        </Modal>
      </Content>
    );
  }
}

const { object } = PropTypes;
AdditionalDocs.propTypes = {
  translations: object.isRequired,
  proposal: object.isRequired,
};
