import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import Comment from '@digix/gov-ui/pages/proposals/comment/comment';
import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import CommentReply from '@digix/gov-ui/pages/proposals/comment/reply';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { CommentReplyPost, ParentCommentItem } from '@digix/gov-ui/pages/proposals/comment/style';
import { fetchRepliesQuery } from '@digix/gov-ui/api/graphql-queries/comments';
import { initializePayload } from '@digix/gov-ui/api';

class ParentThread extends React.Component {
  constructor(props) {
    super(props);
    const { thread } = this.props;

    this.state = {
      thread,
      showEditor: false,
    };
  }

  addReply = body => {
    const thread = { ...this.state.thread };
    const { ChallengeProof, currentUser, setCommentingPrivileges, setError } = this.props;

    if (!ChallengeProof.data) {
      setError(CommentsApi.ERROR_MESSAGES.createComment);
      return;
    }

    const payload = initializePayload(ChallengeProof);
    CommentsApi.create(thread.id, body, payload)
      .then(node => {
        const newComment = CommentsApi.generateNewComment(node, currentUser, thread.id);
        let replyList = thread.replies.edges;

        if (!replyList) {
          replyList = CommentsApi.generateNewThread(newComment);
        } else {
          replyList.push(newComment);
        }

        thread.replies.edges = replyList;
        this.setState({ thread });
      })
      .catch(message => {
        const error = CommentsApi.ERROR_MESSAGES;
        if (message === 'unauthorized_action') {
          setCommentingPrivileges(false);
          setError(error.bannedUser);
        } else {
          setError(error.createReply);
        }
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

  loadMore = endCursor => {
    const { thread } = this.state;
    const apollo = this.props.client;
    const variables = {
      ...this.props.queryVariables,
      endCursor,
      sortBy: 'OLDEST',
    };

    apollo
      .query({
        fetchPolicy: 'network-only',
        query: fetchRepliesQuery,
        variables,
      })
      .then(result => {
        const data = result.data.commentThreads;
        thread.replies.edges = thread.replies.edges.concat(data.edges);
        thread.replies.hasNextPage = data.hasNextPage;
        thread.replies.endCursor = data.endCursor;
        this.setState({ thread });
      });
  };

  renderThreadReplies = replyList => {
    const { currentUser, setCommentingPrivileges, setError, userPoints } = this.props;
    const replies = replyList.edges;

    const replyElements = replies.map(reply => {
      const comment = reply.node;

      return (
        <CommentReply
          comment={comment}
          currentUser={currentUser}
          key={comment.id}
          queryVariables={this.props.queryVariables}
          setCommentingPrivileges={setCommentingPrivileges}
          setError={setError}
          renderThreadReplies={this.renderThreadReplies}
          userPoints={userPoints}
        />
      );
    });

    const hasSiblings = replyList.hasNextPage && replyList.edges.length > 0;
    return (
      <section className="comment-reply">
        {replyElements}
        {hasSiblings && (
          <CommentReplyPost>
            <Button data-digix="Comment-Load-Replies" kind="text" xsmall onClick={() => this.loadMore(replyList.endCursor)}>
              Load more replies...
            </Button>
          </CommentReplyPost>
        )}
      </section>
    );
  };

  render() {
    const { currentUser, setError, userPoints } = this.props;
    const { thread, showEditor } = this.state;
    if (!thread) {
      return null;
    }

    return (
      <ParentCommentItem>
        <Comment
          comment={thread}
          currentUser={currentUser}
          hideEditor={this.hideEditor}
          setError={setError}
          toggleEditor={this.toggleEditor}
          userPoints={userPoints}
        />
        {showEditor && <CommentTextEditor addComment={this.addReply} callback={this.hideEditor} />}
        {this.renderThreadReplies(thread.replies)}
      </ParentCommentItem>
    );
  }
}

const { func, object } = PropTypes;

ParentThread.propTypes = {
  ChallengeProof: object,
  client: object.isRequired,
  currentUser: object.isRequired,
  queryVariables: object.isRequired,
  setCommentingPrivileges: func.isRequired,
  setError: func.isRequired,
  thread: object.isRequired,
  userPoints: object.isRequired,
};

ParentThread.defaultProps = {
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default withApollo(
  connect(
    mapStateToProps,
    {}
  )(ParentThread)
);
