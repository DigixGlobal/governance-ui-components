import React from 'react';
import PropTypes from 'prop-types';

import {
  Author,
  BannedCommentEditor,
  CommentEditor,
  CommentEditorContainer,
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
    const { canComment } = this.props;
    const { addComment, callback } = this.props;

    if (!canComment) {
      return;
    }

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
    const {
      canComment,
      translations: { project, buttons },
    } = this.props;
    const isContentEmpty = content === '';

    // TODO: Add Translation
    return (
      <EditorContainer>
        <CommentEditor>
          <Author>
            <span>{project.commentAs}&nbsp;</span>
            {renderDisplayName('CommentEditor-DisplayName')}
          </Author>
          <CommentEditorContainer>
            {!canComment && (
              <BannedCommentEditor>
                <p>You have been banned by the administrators from commenting.</p>
                <p>
                  Please contact Digix if you want to request a restoration of your account rights.
                </p>
              </BannedCommentEditor>
            )}
            <CommentTextArea
              disabled={!canComment}
              onChange={this.onChange}
              placeholder={project.commentPlaceHolder}
              value={content}
              data-digix="Thread-Field"
            />
          </CommentEditorContainer>
          <PostCommentButton
            primary
            disabled={isContentEmpty || !canComment}
            onClick={() => this.createComment()}
            data-digix="Thread-Button"
          >
            {buttons.postComment}
          </PostCommentButton>
        </CommentEditor>
      </EditorContainer>
    );
  }
}

const { bool, func, object } = PropTypes;

CommentTextEditor.propTypes = {
  addComment: func.isRequired,
  callback: func, // to call after a comment is submitted
  canComment: bool,
  translations: object.isRequired,
};

CommentTextEditor.defaultProps = {
  callback: undefined,
  canComment: true,
};
