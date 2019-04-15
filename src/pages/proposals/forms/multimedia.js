import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-responsive-modal';

import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import PDFViewer from '@digix/gov-ui/components/common/elements/pdf-viewer';

import { dijixImageConfig, dijixPdfConfig, dijix } from '@digix/gov-ui/utils/dijix';

import {
  Fieldset,
  FormItem,
  Label,
  MediaUploader,
  ImageItem,
  ImageHolder,
  CloseButton,
  ErrorMessage,
} from '@digix/gov-ui/pages/proposals/forms/style';

import { fetchImages } from '@digix/gov-ui/pages/proposals/image-helper';

class Multimedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: undefined,
      thumbnails: undefined,
      selectedImage: undefined,
      uploadError: undefined,
    };
  }

  componentDidMount = () => {
    const { images } = this.props.form;
    if (images)
      fetchImages(images).then(files => {
        this.setState({ files });
      });
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  handleDeleteNewlyUploaded = index => () => {
    const { thumbnails } = this.state;
    const { proofs } = this.props.form;
    if (index < 0 || (!thumbnails && !proofs)) return;

    if (thumbnails) thumbnails.splice(index, 1);

    if (proofs) proofs.splice(index, 1);

    this.setState({ thumbnails: thumbnails || proofs }, () => {
      this.props.onChange('proofs', proofs);
    });
  };

  handleDeleteExisting = index => () => {
    const { images } = this.props.form;
    const { files } = this.state;
    if (index < 0 || !images) return;
    files.splice(index, 1);
    const filtered = images.filter((img, i) => i !== index);

    this.setState({ files }, () => {
      this.props.onChange('images', filtered);
    });
  };

  handleUpload = e => {
    const {
      onChange,
      form: { proofs },
      translations: { project },
    } = this.props;
    const { files: existingImages } = this.state;
    const { accept } = e.target;
    const supported = [];
    let error;
    accept.split(',').forEach(item => {
      if (item === 'image/*') {
        supported.push('image/png');
        supported.push('image/jpeg');
      }
      if (item === '.pdf') supported.push('application/pdf');
      else supported.push(item);
    });

    if (e.target.files.length > 0) {
      const proofsArray = [];
      const thumbs = [];

      const files = existingImages ? [...existingImages] : [];

      Array.from(e.target.files).map(file => {
        const fileSize = file.size / 1024 / 1024;
        if (fileSize > 10) {
          this.setState({ uploadError: project.uploadImageButtonHelpText });
          return undefined;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          const { result } = reader;

          if (supported.findIndex(item => item === file.type) === -1) {
            error = `Unsupported ${file.type} file type`;
            this.setState({ uploadError: error });
            return error;
          }

          if (file.type === 'image/png' || file.type === 'image/jpeg') {
            thumbs.push({
              fileType: file.type,
              src: result,
              base64: result,
              name: file.name,
              index: thumbs.length > 0 ? thumbs.length - 1 : 0,
            });

            proofsArray.push({
              type: 'image',
              src: result.toString(),
              base64: result,
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
              base64: result,
              name: file.name,
              index: proofsArray.length > 0 ? proofsArray.length - 1 : 0,
              embed: 'pdfKey',
              ...dijixPdfConfig,
            });
          }

          if (onChange) {
            onChange('proofs', proofs ? proofs.concat(proofsArray) : proofsArray);
          }
        };
        reader.readAsDataURL(file);

        return this.setState({ thumbnails: thumbs, files });
      });
    }
  };

  renderDocuments(documents, existing) {
    if (!documents) return null;

    return this.renderImages(documents, existing);
  }

  renderImages = (proofs, existing) => {
    const {
      translations: {
        common: { buttons },
      },
    } = this.props;
    if (!proofs || proofs.length === 0) return null;
    const images = proofs.map((img, i) => {
      let source;

      if (!source && !img.base64 && img.src) {
        source = `${dijix.config.httpEndpoint}/${img.src}`;
      } else if (!source && img.base64) {
        source = img.base64;
      }

      if (img.type === 'pdf')
        return (
          <ImageItem key={`img-${i + 1}`}>
            <CloseButton
              kind="text"
              onClick={existing ? this.handleDeleteExisting(i) : this.handleDeleteNewlyUploaded(i)}
            >
              <Icon kind="trash" /> {buttons.remove}
            </CloseButton>
            <PDFViewer file={source} />
          </ImageItem>
        );
      return (
        <ImageItem key={`img-${i + 1}`}>
          <CloseButton
            kind="text"
            onClick={existing ? this.handleDeleteExisting(i) : this.handleDeleteNewlyUploaded(i)}
          >
            <Icon kind="trash" /> {buttons.remove}
          </CloseButton>
          {/* eslint-disable*/}
          <img alt="" onClick={this.showHideImage(source)} src={source} />
          {/* eslint-enable */}
        </ImageItem>
      );
    });
    return images;
  };

  render() {
    const { files, selectedImage, uploadError } = this.state;
    const { proofs, images: imageHash } = this.props.form;
    const {
      translations: { project, sidebar },
    } = this.props;
    const images = proofs;
    return (
      <Fieldset>
        <FormItem>
          <Label>{project.uploadImages}</Label>
          <MediaUploader>
            <div>
              <Button
                kind="upload"
                accept="image/*,.pdf"
                primary
                fluid
                large
                multiple
                id="image-upload"
                onChange={this.handleUpload}
                type="file"
                caption={project.uploadImageButton}
              >
                <div>{project.uploadImageButtonHelpText}</div>
              </Button>
            </div>

            <ImageHolder>
              {images && this.renderDocuments(images)}
              {imageHash && this.renderDocuments(files, true)}
              {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
            </ImageHolder>
          </MediaUploader>
        </FormItem>
        <Modal open={this.state.open} onClose={this.showHideImage()}>
          <div>
            <img alt="" style={{ width: '100%' }} src={selectedImage} />
            <Button kind="round" onClick={this.showHideImage()}>
              {sidebar.close}
            </Button>
          </div>
        </Modal>
      </Fieldset>
    );
  }
}

const { func, object } = PropTypes;

Multimedia.propTypes = {
  onChange: func.isRequired,
  form: object.isRequired,
  translations: object.isRequired,
};
export default Multimedia;
