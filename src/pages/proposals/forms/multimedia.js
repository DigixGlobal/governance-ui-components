import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-responsive-modal';

import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import { dijixImageConfig, dijixPdfConfig, dijix } from '@digix/gov-ui/utils/dijix';

import {
  Fieldset,
  FormItem,
  Label,
  MediaUploader,
  ImageHolder,
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
    };
  }

  componentDidMount = () => {
    const { images } = this.props.form;
    fetchImages(images).then(files => this.setState({ files }));
  };

  showHideImage = source => () => {
    this.setState({ open: !this.state.open, selectedImage: source });
  };

  handleDeleteNewlyUploaded = index => () => {
    const { thumbnails } = this.state;
    const { proofs } = this.props.form;
    if (index < 0 || (!thumbnails && !proofs)) return;

    if (thumbnails) {
      thumbnails.splice(index, 1);
    }
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
    const { onChange } = this.props;
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
      const files = [];
      Array.from(e.target.files).map(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const { result } = reader;

          if (supported.findIndex(item => item === file.type) === -1) {
            error = `Unsupported ${file.type} file type`;
            return error;
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
              index: proofsArray.length > 0 ? proofsArray.length - 1 : 0,
              embed: 'pdfKey',
              ...dijixPdfConfig,
            });
          }

          if (onChange) {
            onChange('proofs', proofsArray);
          }
        };
        reader.readAsDataURL(file);
        return this.setState({ thumbnails: thumbs });
      });
    }
  };

  renderDocuments(documents, existing) {
    if (!documents) return null;

    return this.renderImages(documents, existing);
  }

  renderImages = (proofs, existing) => {
    if (!proofs || proofs.length === 0) return null;
    const images = proofs.map((img, i) => {
      let source = img.thumbnail;

      if (!source && img.src) {
        source = img.src;
      } else if (source) {
        source = `${dijix.config.httpEndpoint}/${img.src}`;
      }
      return (
        <div>
          <Button
            onClick={existing ? this.handleDeleteExisting(i) : this.handleDeleteNewlyUploaded(i)}
          >
            Delete
          </Button>
          {/* eslint-disable*/}
          <img key={`img-${i + 1}`} alt="" onClick={this.showHideImage(source)} src={source} />;
          {/* eslint-enable */}
        </div>
      );
    });
    return images;
  };

  render() {
    const { thumbnails, files, selectedImage } = this.state;
    const { proofs, images: imageHash } = this.props.form;
    const images = thumbnails || proofs;
    return (
      <Fieldset>
        <FormItem>
          <Label>Upload Project Images</Label>
          <MediaUploader>
            <div>
              <Button
                kind="upload"
                accept="image/*"
                primary
                fluid
                large
                multiple
                id="image-upload"
                onChange={this.handleUpload}
                type="file"
                caption="Select Images to Upload"
              >
                <div>
                  Image must be in JPEG or PNG format &amp; file size must be lesser than 10MB.
                </div>
              </Button>
            </div>
            <div>
              <ImageHolder>
                {images && this.renderDocuments(images)}
                {imageHash && this.renderDocuments(files, true)}
              </ImageHolder>
            </div>
          </MediaUploader>
        </FormItem>
        <Modal open={this.state.open} onClose={this.showHideImage()}>
          <div>
            <img alt="" style={{ width: '100%' }} src={selectedImage} />
            <Button kind="round" onClick={this.showHideImage()}>
              Close
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
};
export default Multimedia;
