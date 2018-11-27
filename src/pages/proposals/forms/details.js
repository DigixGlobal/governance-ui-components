import React from 'react';
import PropTypes from 'prop-types';

import { TextArea } from '../../../components/common/elements/index';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './quill.css';

// import PropTypes from 'prop-types';

import { Fieldset, FormItem, Label, EditorContainer } from './style';

class Details extends React.Component {
  render() {
    const { onChange, form } = this.props;
    return (
      <Fieldset>
        <FormItem>
          <Label>Project Information</Label>
          <EditorContainer>
            <TextArea
              value={form.details || ''}
              id="details"
              onChange={onChange}
              placeholder="Short description of your project"
            />
            {/* <ReactQuill
              id="details"
              value={form.details || ''}
              onChange={value => onChange('details', value)}
            /> */}
          </EditorContainer>
        </FormItem>
      </Fieldset>
    );
  }
}

const { func, object } = PropTypes;

Details.propTypes = {
  onChange: func.isRequired,
  form: object.isRequired,
};

export default Details;
