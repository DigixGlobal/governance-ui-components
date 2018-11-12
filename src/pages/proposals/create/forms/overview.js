import React from 'react';
// import PropTypes from 'prop-types';

import { Input, TextArea } from '../../../../components/common/elements/index';
import { Fieldset, FormItem, Label } from '../style';

class OverView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        shorDescription: '',
      },
    };
  }

  render() {
    return (
      <Fieldset>
        <FormItem>
          <Label>Project Title</Label>
          <Input placeholder="Implementation of Silver tokens" />
        </FormItem>
        <FormItem>
          <Label>Short Description</Label>
          <TextArea placeholder="Max 200 characters" />
        </FormItem>
      </Fieldset>
    );
  }
}

export default OverView;
