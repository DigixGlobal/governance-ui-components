import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '@digix/gov-ui/pages/proposals/comment/comment';
import CommentAuthor from '@digix/gov-ui/pages/proposals/comment/author';
import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import { CommentReplyPost } from '@digix/gov-ui/pages/proposals/comment/style';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { initializePayload } from '@digix/gov-ui/api';

class CommentReply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
      showEditor: false,
    };
  }

  addReply = body => {
    const comment = { ...this.state.comment };
    const { ChallengeProof, setError } = this.props;

    if (!ChallengeProof.data) {
      return;
    }

    const payload = initializePayload(ChallengeProof);
    CommentsApi.create(comment.id, body, payload)
      .then(newComment => {
        if (!comment.replies) {
          comment.replies = CommentsApi.generateNewThread(newComment);
        } else {
          comment.replies.data.push(newComment);
        }

        this.setState({ comment });
      })
      .catch(() => {
        setError(CommentsApi.ERROR_MESSAGES.createReply);
      });
  };

  hideEditor = () => {
    this.setState({
      showEditor: false,
    });
  };

  toggleEditor = () => {
    const { showEditor } = this.state;
    this.setState({
      showEditor: !showEditor,
    });
  };

  render() {
    const { hasMore, renderThreadReplies, setError, uid } = this.props;
    const { comment, showEditor } = this.state;
    if (!comment) {
      return null;
    }

    return (
      <CommentReplyPost>
        <CommentAuthor user={comment.user} />
        <Comment comment={comment} setError={setError} toggleEditor={this.toggleEditor} uid={uid} />
        {showEditor && (
          <CommentTextEditor addComment={this.addReply} callback={this.hideEditor} uid={uid} />
        )}

        {renderThreadReplies(comment.replies)}
        {hasMore && <a href="#">Load more replies...</a>}
      </CommentReplyPost>
    );
  }
}

const { bool, func, object, string } = PropTypes;

CommentReply.propTypes = {
  ChallengeProof: object,
  comment: object.isRequired,
  hasMore: bool.isRequired,
  renderThreadReplies: func.isRequired,
  setError: func.isRequired,
  uid: string.isRequired,
};

CommentReply.defaultProps = {
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default connect(
  mapStateToProps,
  {}
)(CommentReply);
