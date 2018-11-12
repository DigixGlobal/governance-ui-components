import React from 'react';
import PropTypes from 'prop-types';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './quill.css';

// import PropTypes from 'prop-types';

import { Fieldset, FormItem, Label, EditorContainer } from '../style';

class Details extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = { text: '' }; // You can also pass a Quill Delta here
  //   // this.handleChange = this.handleChange.bind(this);
  // }

  // handleChange(value) {
  //   this.setState({ text: value });
  // }

  render() {
    const { onChange } = this.props;
    return (
      <Fieldset>
        <FormItem>
          <Label>Project Information</Label>
          <EditorContainer>
            <ReactQuill id="details" onChange={value => onChange('details', value)} />
          </EditorContainer>
        </FormItem>
      </Fieldset>
    );
  }
}

const { func } = PropTypes;

Details.propTypes = {
  onChange: func.isRequired,
};

export default Details;
