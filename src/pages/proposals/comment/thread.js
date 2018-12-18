import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '@digix/gov-ui/pages/proposals/comment/comment';
import CommentAuthor from '@digix/gov-ui/pages/proposals/comment/author';
import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import CommentReply from '@digix/gov-ui/pages/proposals/comment/reply';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { CommentReplyPost, ParentCommentItem } from '@digix/gov-ui/pages/proposals/comment/style';
import { initializePayload } from '@digix/gov-ui/api';

class ParentThread extends React.Component {
  constructor(props) {
    super(props);
    const { thread } = this.props;

    let lastSeenId = thread.id;
    const replies = thread.replies.data;
    if (thread.replies && replies.length > 0) {
      lastSeenId = replies[replies.length - 1].id;
    }

    this.state = {
      thread,
      lastSeenId,
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

  fetchThreads = fetchParams => {
    const { ChallengeProof } = this.props;
    if (!ChallengeProof.data) {
      return null;
    }

    const { thread } = this.state;
    const payload = initializePayload(ChallengeProof);

    CommentsApi.getThread(thread.id, fetchParams, payload)
      .then(newComments => {
        const newReplies = newComments.data;
        const lastSeenId =
          newComments && newReplies.length > 0
            ? newReplies[newReplies.length - 1].id
            : this.state.lastSeenId;

        thread.replies = {
          ...thread.replies,
          hasMore: newComments.hasMore,
          data: thread.replies.data.concat(newReplies),
        };

        this.setState({ lastSeenId, thread });
        return newComments;
      })
      .catch(() => {
        this.setError(CommentsApi.ERROR_MESSAGES.fetch);
      });

    return null;
  };

  hideEditor = () => {
    this.setState({
      showEditor: false,
    });
  };

  loadMoreComments = () => {
    const { lastSeenId } = this.state;
    const { sortBy } = this.props;

    this.fetchThreads({
      last_seen_id: lastSeenId,
      sort_by: sortBy,
    });
  };

  toggleEditor = () => {
    const { showEditor } = this.state;
    this.setState({
      showEditor: !showEditor,
    });
  };

  renderThreadReplies = replies => {
    const { setError, sortBy, uid } = this.props;
    if (!replies) {
      return null;
    }

    const replyElements = replies.data.map(comment => (
      <CommentReply
        comment={comment}
        key={comment.id}
        setError={setError}
        sortBy={sortBy}
        renderThreadReplies={this.renderThreadReplies}
        uid={uid}
      />
    ));

    const hasMoreSiblings = replies.data && replies.data.length > 0 && replies.hasMore;
    return (
      <section className="comment-reply">
        {replyElements}
        {hasMoreSiblings && (
          <CommentReplyPost>
            <Button kind="text" xsmall onClick={() => this.loadMoreComments()}>
              Load more replies...
            </Button>
          </CommentReplyPost>
        )}
      </section>
    );
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
  sortBy: string.isRequired,
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
