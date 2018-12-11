import React from 'react';
import PropTypes from 'prop-types';

import { Button, TextArea } from '@digix/gov-ui/components/common/elements/index';
import {
  Author,
  CommentEditor,
  EditorContainer,
} from '@digix/gov-ui/pages/proposals/comment/style';

export default class CommentTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  onChange = e => {
    this.setState({
      content: e.target.value,
    });
  };

  createComment = () => {
    const { addComment, callback } = this.props;

    addComment(this.state.content);
    this.setState({
      content: '',
    });

    if (callback !== undefined) {
      callback();
    }
  };

  render() {
    const { uid } = this.props;
    const { content } = this.state;
    const isContentEmpty = content === '';

    return (
      <EditorContainer>
        <Button
          kind="round"
          primary
          ghost
          disabled={isContentEmpty}
          onClick={() => this.createComment()}
        >
          Comment
        </Button>
        <CommentEditor>
          <Author>
            Comment as <span>{uid}</span>
          </Author>
          <TextArea
            onChange={this.onChange}
            placeholder="Write your comment here."
            value={content}
          />
        </CommentEditor>
      </EditorContainer>
    );
  }
}

const { func, string } = PropTypes;

CommentTextEditor.propTypes = {
  addComment: func.isRequired,
  callback: func, // to call after a comment is submitted
  uid: string,
};

CommentTextEditor.defaultProps = {
  callback: undefined,
  uid: '',
};
