import React from 'react';
import PropTypes from 'prop-types';

import { Button, Select, Input } from '../../../../components/common/elements/index';
import { Fieldset, FormItem, Label, MediaUploader, ImageHolder, LeftCol, RightCol } from '../style';

import { dijixImageConfig, dijixPdfConfig } from '../../../../utils/dijix';
import { UploadButtonContainer, UploadButton, UploadInput } from './multimediaStyles';

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
    // this.setState({ proofs: [], thumbnails: [], files: [], error: undefined });

    // if (onChange) {
    //   onChange({ value: undefined });
    // } else {
    //   formChange({ name, value: undefined });
    // }

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
            // this.setState({ proofs: [], thumbnails: [], files: [], error });
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

  render() {
    const { thumbnails } = this.state;
    return (
      <Fieldset>
        {/* <FormItem>
          <Label>Number of Image(s)</Label>
          <Select id="test" items={[{ text: '1', value: '1' }, { text: '2', value: '2' }]} />
        </FormItem> */}
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
                {thumbnails &&
                  thumbnails.map(image => (
                    <img key={image.name} alt={image.name} src={image.src} />
                  ))}
              </ImageHolder>
            </RightCol>
          </MediaUploader>
        </FormItem>
      </Fieldset>
    );
  }
}

const { func } = PropTypes;

Multimedia.propTypes = {
  onChange: func.isRequired,
};
export default Multimedia;
