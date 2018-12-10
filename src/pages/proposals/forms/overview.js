import React from 'react';
import PropTypes from 'prop-types';

import { Input, TextArea } from '../../../components/common/elements/index';
import { Fieldset, FormItem, Label } from './style';

class OverView extends React.Component {
  render() {
    const { onChange, form } = this.props;
    return (
      <Fieldset>
        <FormItem>
          <Label>Project Title</Label>
          <Input
            id="title"
            value={form.title || ''}
            onChange={onChange}
            placeholder="i.e. Implementation of Silver tokens"
          />
        </FormItem>
        <FormItem>
          <Label>Short Description</Label>
          <TextArea
            value={form.description || ''}
            id="description"
            onChange={onChange}
            placeholder="Short description of your project"
          />
        </FormItem>
      </Fieldset>
    );
  }
}

const { func, object } = PropTypes;

OverView.propTypes = {
  onChange: func.isRequired,
  form: object.isRequired,
};
export default OverView;
