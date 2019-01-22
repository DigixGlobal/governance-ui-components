import React from 'react';
import PropTypes from 'prop-types';

import { UploadInputContainer, UploadButton, UploadInput } from './style';

const UploadFileButton = props => (
  <UploadInputContainer>
    <UploadInput
      accept={props.accept ? props.accept : 'image/*'}
      id={props.id ? props.id : 'image-upload'}
      multiple={props.multiple}
      onChange={props.onChange}
      type="file"
    />
    <UploadButton secondary fluid htmlFor={props.id ? props.id : 'image-upload'}>
      {props.caption}
    </UploadButton>
    {props.children}
  </UploadInputContainer>
);

const { object, string, node, oneOfType, bool, func } = PropTypes;

UploadFileButton.propTypes = {
  caption: string.isRequired,
  id: string.isRequired,
  multiple: bool,
  accept: string.isRequired,
  onChange: func.isRequired,
  // fullWidth: bool,
  children: oneOfType([object, string, node]),
};

UploadFileButton.defaultProps = {
  // fullWidth: false,
  children: null,
  multiple: false,
};
export default UploadFileButton;
