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
      data-digix={props.dataDigix}
      name={props.name}
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
  children: oneOfType([object, string, node]),
  dataDigix: string,
  name: string,
};

UploadFileButton.defaultProps = {
  children: null,
  dataDigix: '',
  name: '',
  multiple: false,
};
export default UploadFileButton;
