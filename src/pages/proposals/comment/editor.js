import React from 'react';
import PropTypes from 'prop-types';

import {
  Author,
  CommentEditor,
  CommentTextArea,
  EditorContainer,
  PostCommentButton,
} from '@digix/gov-ui/pages/proposals/comment/style';
import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';

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
    const { content } = this.state;
    const isContentEmpty = content === '';

    return (
      <EditorContainer>
        <CommentEditor>
          <Author>
            <span>Comment as&nbsp;</span>
            {renderDisplayName('CommentEditor-DisplayName')}
          </Author>
          <CommentTextArea
            onChange={this.onChange}
            placeholder="Write your comment here."
            value={content}
          />
          <PostCommentButton
            kind="round"
            primary
            reverse
            disabled={isContentEmpty}
            onClick={() => this.createComment()}
          >
            Post Comment
          </PostCommentButton>
        </CommentEditor>
      </EditorContainer>
    );
  }
}

const { func } = PropTypes;

CommentTextEditor.propTypes = {
  addComment: func.isRequired,
  callback: func, // to call after a comment is submitted
};

CommentTextEditor.defaultProps = {
  callback: undefined,
};
