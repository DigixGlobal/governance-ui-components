import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Comment from '@digix/gov-ui/pages/proposals/comment/comment';
import CommentAuthor from '@digix/gov-ui/pages/proposals/comment/author';
import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { CommentReplyPost } from '@digix/gov-ui/pages/proposals/comment/style';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { initializePayload } from '@digix/gov-ui/api';

class CommentReply extends React.Component {
  constructor(props) {
    super(props);
    const { comment } = this.props;

    let lastSeenId = comment.id;
    const replies = comment.replies.data;
    if (comment.replies && replies.length > 0) {
      lastSeenId = replies[replies.length - 1].id;
    }

    this.state = {
      comment,
      lastSeenId,
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

  fetchThreads = fetchParams => {
    const { ChallengeProof } = this.props;
    if (!ChallengeProof.data) {
      return null;
    }

    const { comment } = this.state;
    const payload = initializePayload(ChallengeProof);

    CommentsApi.getThread(comment.id, fetchParams, payload)
      .then(newComments => {
        const newReplies = newComments.data;
        const lastSeenId =
          newComments && newReplies.length > 0
            ? newReplies[newReplies.length - 1].id
            : this.state.lastSeenId;

        comment.replies = {
          ...comment.replies,
          hasMore: newComments.hasMore,
          data: comment.replies.data.concat(newReplies),
        };

        this.setState({ lastSeenId, comment });
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

  loadMoreReplies = () => {
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

  render() {
    const { renderThreadReplies, setError, uid } = this.props;
    const { comment, showEditor } = this.state;

    if (!comment) {
      return null;
    }

    const { replies } = comment;
    const hasMoreChildren = replies.data && replies.data.length === 0 && replies.hasMore;

    return (
      <section>
        <CommentReplyPost>
          <CommentAuthor user={comment.user} />
          <Comment
            comment={comment}
            setError={setError}
            toggleEditor={this.toggleEditor}
            uid={uid}
          />
          {showEditor && (
            <CommentTextEditor addComment={this.addReply} callback={this.hideEditor} uid={uid} />
          )}

          {renderThreadReplies(comment.replies)}
        </CommentReplyPost>
        {hasMoreChildren && (
          <CommentReplyPost>
            <Button kind="text" xsmall onClick={() => this.loadMoreReplies()}>
              Load more replies...
            </Button>
          </CommentReplyPost>
        )}
      </section>
    );
  }
}

const { func, object, string } = PropTypes;

CommentReply.propTypes = {
  ChallengeProof: object,
  comment: object.isRequired,
  renderThreadReplies: func.isRequired,
  setError: func.isRequired,
  sortBy: string.isRequired,
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
