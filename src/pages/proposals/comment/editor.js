import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import { connect } from 'react-redux';

import {
  Author,
  BannedCommentEditor,
  CommentEditor,
  CommentEditorContainer,
  CommentTextArea,
  EditorContainer,
  ErrorMessage,
  PostCommentButton,
} from '@digix/gov-ui/pages/proposals/comment/style';
import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';
import { hasInvalidLink } from '@digix/gov-ui/utils/helpers';

class CommentTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      canPost: false,
    };

    this.EMPTY_HTML = /^((<p>)((<br>)*|(\s*)|)*(<\/p>))*$/;
  }

  onChange = value => {
    const { canComment } = this.props;
    const hasContent = !this.EMPTY_HTML.test(value);
    const invalidLink = hasInvalidLink(value);
    const canPost = canComment && hasContent && !invalidLink;

    this.setState({
      content: value,
      canPost,
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
    const { content, canPost } = this.state;
    const {
      canComment,
      cannotView,
      translations: {
        data: {
          project,
          common: { buttons, errors },
        },
      },
    } = this.props;

    const invalidLink = hasInvalidLink(content);

    // TODO: Add Translation
    return (
      <EditorContainer>
        <CommentEditor>
          {!cannotView && (
            <Author>
              <span>{project.commentAs}&nbsp;</span>
              {renderDisplayName('CommentEditor-DisplayName')}
            </Author>
          )}
          <CommentEditorContainer error={invalidLink}>
            {!canComment && !cannotView && (
              <div>
                <BannedCommentEditor>
                  <p>You have been banned by the administrators from commenting.</p>
                  <p>
                    Please contact Digix if you want to request a restoration of your account
                    rights.
                  </p>
                </BannedCommentEditor>
                <CommentTextArea disabled={!canComment} data-digix="Thread-Field" />
              </div>
            )}
            {canComment && (
              <ReactQuill
                disabled={!canComment}
                onChange={this.onChange}
                placeholder={project.commentPlaceHolder}
                value={content}
                data-digix="Thread-Field"
              />
            )}
            {invalidLink && (
              <ErrorMessage>
                <Markdown source={errors.invalidLink} escapeHtml={false} />
              </ErrorMessage>
            )}
          </CommentEditorContainer>
          {canComment && (
            <PostCommentButton
              primary
              disabled={!canPost}
              onClick={() => this.createComment()}
              data-digix="Thread-Button"
            >
              {buttons.postComment}
            </PostCommentButton>
          )}
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
  cannotView: bool,
  translations: object.isRequired,
};

CommentTextEditor.defaultProps = {
  callback: undefined,
  canComment: true,
  cannotView: false,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations,
});

export default connect(
  mapStateToProps,
  {}
)(CommentTextEditor);
