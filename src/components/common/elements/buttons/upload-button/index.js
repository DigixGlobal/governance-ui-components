import React from 'react';
import PropTypes from 'prop-types';

import { UploadButtonContainer, UploadButton, UploadInput } from './style';

const UploadFileButton = props => (
  <UploadButtonContainer>
    <UploadInput
      accept={props.accept ? props.accept : 'image/*'}
      id={props.id ? props.id : 'image-upload'}
      multiple={props.multiple}
      onChange={props.onChange}
      type="file"
    />
    <UploadButton primary ghost htmlFor={props.id ? props.id : 'image-upload'}>
      {props.caption}
    </UploadButton>
    {props.children}
  </UploadButtonContainer>
);

const { object, string, node, oneOfType, bool, func } = PropTypes;

UploadFileButton.propTypes = {
  caption: string.isRequired,
  id: string.isRequired,
  multiple: bool.isRequired,
  accept: string.isRequired,
  onChange: func.isRequired,
  children: oneOfType([object, string, node]).isRequired,
};

export default UploadFileButton;
