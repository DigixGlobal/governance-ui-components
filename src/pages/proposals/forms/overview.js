import React from 'react';
import PropTypes from 'prop-types';

import { Input, TextArea } from '../../../components/common/elements/index';
import { Fieldset, FormItem, Label } from './style';

class OverView extends React.Component {
  render() {
    // console.log(decodeHash('0x9fa5c38478b3cb4a24ca3a6ca41eb0457d78a62e29039ee9b17484e32429fd95'));

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
