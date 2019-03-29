import React from 'react';
import PropTypes from 'prop-types';
import { Input, TextArea } from '@digix/gov-ui/components/common/elements';
import { ErrorMessage, Fieldset, FormItem, Label } from '@digix/gov-ui/pages/proposals/forms/style';

class OverView extends React.Component {
  render() {
    const { errors, form, onChange } = this.props;
    const { description, title } = form;
    const { invalidDescription, invalidTitle } = errors;

    return (
      <Fieldset>
        <FormItem>
          <Label error={invalidTitle} req>
            Project Title
            <span>&nbsp;*</span>
          </Label>
          <Input
            id="title"
            error={invalidTitle}
            value={title || ''}
            onChange={onChange}
            placeholder="i.e. Implementation of Silver tokens"
          />
          {invalidTitle && <ErrorMessage>This field is required.</ErrorMessage>}
        </FormItem>
        <FormItem>
          <Label error={invalidDescription} req>
            Short Description
            <span>&nbsp;*</span>
          </Label>
          <TextArea
            error={invalidDescription}
            value={description || ''}
            id="description"
            onChange={onChange}
            placeholder="Short description of your project"
          />
          {invalidDescription && <ErrorMessage>This field is required.</ErrorMessage>}
        </FormItem>
      </Fieldset>
    );
  }
}

const { func, object } = PropTypes;

OverView.propTypes = {
  errors: object.isRequired,
  form: object.isRequired,
  onChange: func.isRequired,
};
export default OverView;
