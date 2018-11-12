import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';

// import PropTypes from 'prop-types';

import { Fieldset, FormItem, Label, EditorContainer } from '../style';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    return (
      <Fieldset>
        <FormItem>
          <Label>Project Information</Label>
          <EditorContainer>
            <ReactQuill value={this.state.text} />
          </EditorContainer>
        </FormItem>
      </Fieldset>
    );
  }
}

export default Details;
