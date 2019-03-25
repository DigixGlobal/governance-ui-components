import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';

import 'react-quill/dist/quill.snow.css';
import '@digix/gov-ui/pages/proposals/forms/quill.css';

import {
  EditorContainer,
  ErrorMessage,
  Fieldset,
  FormItem,
  Label,
} from '@digix/gov-ui/pages/proposals/forms/style';

class Details extends React.Component {
  render() {
    const { form, onChange } = this.props;
    const { invalidDetails } = this.props.errors;

    return (
      <Fieldset>
        <FormItem>
          <Label error={invalidDetails} req>
            Project Information
            <span>&nbsp;*</span>
          </Label>
          <EditorContainer error={invalidDetails}>
            <ReactQuill
              id="details"
              value={form.details || ''}
              onChange={value => onChange('details', value)}
            />
          </EditorContainer>
          {invalidDetails && <ErrorMessage>This field is required.</ErrorMessage>}
        </FormItem>
      </Fieldset>
    );
  }
}

const { func, object } = PropTypes;

Details.propTypes = {
  errors: object.isRequired,
  form: object.isRequired,
  onChange: func.isRequired,
};

export default Details;
