import React from 'react';
import PropTypes from 'prop-types';

import { Fieldset, FormItem, Label, MediaUploader, ImageHolder, LeftCol, RightCol } from './style';

import { dijixImageConfig, dijixPdfConfig, dijix } from '../../../utils/dijix';
import { UploadButtonContainer, UploadButton, UploadInput } from './multimediaStyles';
import ImageViewer from '../../../components/common/ipfs-viewer';

class Multimedia extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbnails: undefined,
    };
  }

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

          if (error) {
            return;
          }

          if (supported.findIndex(item => item === file.type) === -1) {
            error = `Unsupported ${file.type} file type`;
            return;
          }

          if (file.type === 'image/png' || file.type === 'image/jpeg') {
            thumbs.push({ fileType: file.type, src: result, name: file.name });

            proofsArray.push({
              type: 'image',
              src: result.toString(),
              embed: 'imageKey',
              ...dijixImageConfig,
            });
          }

          if (file.type === 'application/pdf') {
            files.push({ fileType: file.type, src: result, name: file.name });
            proofsArray.push({
              type: 'pdf',
              src: file,
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

  renderDocuments(documents) {
    if (!documents) return null;

    return this.renderImages(documents);
  }

  renderImages = (proofs, preview) => {
    if (!proofs) return null;
    const images = proofs.map((img, i) => (
      <img
        key={`img-${i + 1}`}
        alt=""
        src={preview ? img.src : `${dijix.config.httpEndpoint}/${img.src}?q=${Date.now()}`}
      />
    ));
    return images;
  };

  render() {
    const { thumbnails } = this.state;
    const { proofs } = this.props.form;
    const images = thumbnails || proofs;
    return (
      <Fieldset>
        <FormItem>
          <Label>Upload Project Images</Label>
          <MediaUploader>
            <LeftCol>
              <UploadButtonContainer>
                <UploadInput
                  accept="image/*"
                  // className={classes.input}
                  id="image-upload"
                  multiple
                  onChange={this.handleUpload}
                  type="file"
                />
                <UploadButton primary ghost htmlFor="image-upload">
                  Select Images to Upload
                </UploadButton>
              </UploadButtonContainer>
            </LeftCol>
            <RightCol>
              <ImageHolder>
                {images &&
                  images.map(image => <img key={image.name} alt={image.name} src={image.src} />)}
                {/* {imageHash && (
                  <ImageViewer
                    thumbnailSize="512"
                    hashes={imageHash}
                    renderLoading={null}
                    renderResolved={thumbs => this.renderDocuments(thumbs)}
                  />
                )} */}
              </ImageHolder>
            </RightCol>
          </MediaUploader>
        </FormItem>
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
