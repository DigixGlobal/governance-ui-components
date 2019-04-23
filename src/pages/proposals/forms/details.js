import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';

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
    const {
      form,
      onChange,
      translations: { project, common },
    } = this.props;

    const { invalidDetails, invalidLink } = this.props.errors;
    const hasDetailsError = invalidDetails || invalidLink;

    return (
      <Fieldset>
        <FormItem>
          <Label error={invalidDetails} req>
            {project.projectInformation}
            <span>&nbsp;*</span>
          </Label>
          <EditorContainer error={hasDetailsError}>
            <ReactQuill
              id="details"
              value={form.details || ''}
              onChange={value => onChange('details', value)}
            />
          </EditorContainer>
          {invalidDetails && <ErrorMessage>{common.errors.fieldIsRequired}</ErrorMessage>}
          {invalidLink && (
            <ErrorMessage>
              <Markdown source={common.errors.invalidLink} escapeHtml={false} />
            </ErrorMessage>
          )}
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
  translations: object.isRequired,
};

export default Details;
