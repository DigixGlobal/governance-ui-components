import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '@digix/gov-ui/pages/proposals/comment/comment';
import CommentAuthor from '@digix/gov-ui/pages/proposals/comment/author';
import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import CommentReply from '@digix/gov-ui/pages/proposals/comment/reply';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { initializePayload } from '@digix/gov-ui/api';
import { ParentCommentItem } from '@digix/gov-ui/pages/proposals/comment/style';

class ParentThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thread: this.props.thread,
      showEditor: false,
    };
  }

  addReply = body => {
    const thread = { ...this.state.thread };
    const { ChallengeProof } = this.props;

    if (ChallengeProof.data) {
      const payload = initializePayload(ChallengeProof);
      CommentsApi.create(thread.id, body, payload).then(newComment => {
        if (!thread.replies) {
          thread.replies = CommentsApi.generateNewThread(newComment);
        } else {
          thread.replies.data.push(newComment);
        }

        this.setState({ thread });
      });
    }
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

  renderThreadReplies = replies => {
    const { setError, uid } = this.props;
    if (!replies) {
      return null;
    }

    return replies.data.map(comment => (
      <CommentReply
        comment={comment}
        hasMore={replies.hasMore}
        key={comment.id}
        setError={setError}
        renderThreadReplies={this.renderThreadReplies}
        uid={uid}
      />
    ));
  };

  render() {
    const { setError, uid } = this.props;
    const { thread, showEditor } = this.state;
    if (!thread) {
      return null;
    }

    return (
      <ParentCommentItem>
        <CommentAuthor user={thread.user} />
        <Comment comment={thread} setError={setError} toggleEditor={this.toggleEditor} uid={uid} />
        {showEditor && (
          <CommentTextEditor addComment={this.addReply} callback={this.hideEditor} uid={uid} />
        )}
        {this.renderThreadReplies(thread.replies)}
      </ParentCommentItem>
    );
  }
}

const { func, object, string } = PropTypes;

ParentThread.propTypes = {
  ChallengeProof: object,
  setError: func.isRequired,
  thread: object.isRequired,
  uid: string.isRequired,
};

ParentThread.defaultProps = {
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default connect(
  mapStateToProps,
  {}
)(ParentThread);
