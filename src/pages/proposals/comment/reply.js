import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';

import Comment from '@digix/gov-ui/pages/proposals/comment/comment';
import CommentTextEditor from '@digix/gov-ui/pages/proposals/comment/editor';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { CommentReplyPost } from '@digix/gov-ui/pages/proposals/comment/style';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { fetchCommentsQuery } from '@digix/gov-ui/api/graphql-queries/comments';
import { initializePayload } from '@digix/gov-ui/api';

class CommentReply extends React.Component {
  constructor(props) {
    super(props);
    const { comment } = this.props;

    this.state = {
      comment,
      showEditor: false,
    };
  }

  addReply = body => {
    const comment = { ...this.state.comment };
    const { ChallengeProof, currentUser, setError } = this.props;

    if (!ChallengeProof.data) {
      setError(CommentsApi.ERROR_MESSAGES.createComment);
      return;
    }

    const payload = initializePayload(ChallengeProof);
    CommentsApi.create(comment.id, body, payload)
      .then(node => {
        const newComment = CommentsApi.generateNewComment(node, currentUser, comment.id);
        let replyList = comment.replies.edges;

        if (!replyList) {
          replyList = CommentsApi.generateNewThread(newComment);
        } else {
          replyList.push(newComment);
        }

        comment.replies.edges = replyList;
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

  loadMore = endCursor => {
    const { comment } = this.state;
    const apollo = this.props.client;
    const variables = {
      ...this.props.queryVariables,
      endCursor,
      sortBy: 'OLDEST',
    };

    apollo
      .query({
        fetchPolicy: 'network-only',
        query: fetchCommentsQuery,
        variables,
      })
      .then(result => {
        const data = result.data.commentThreads;
        comment.replies.edges = comment.replies.edges.concat(data.edges);
        comment.replies.hasNextPage = data.hasNextPage;
        comment.replies.endCursor = data.endCursor;
        this.setState({ comment });
      });
  };

  render() {
    const { currentUser, renderThreadReplies, setError, userPoints } = this.props;
    const { comment, showEditor } = this.state;

    if (!comment) {
      return null;
    }

    const { replies } = comment;
    const hasChildren = replies && replies.hasNextPage && !replies.edges.length;

    return (
      <section>
        {comment.id && (
          <CommentReplyPost>
            <Comment
              comment={comment}
              currentUser={currentUser}
              setError={setError}
              toggleEditor={this.toggleEditor}
              userPoints={userPoints}
            />
            {showEditor && (
              <CommentTextEditor addComment={this.addReply} callback={this.hideEditor} />
            )}
            {replies && renderThreadReplies(replies)}
          </CommentReplyPost>
        )}
        {hasChildren && (
          <CommentReplyPost>
            <CommentReplyPost>
              <Button kind="text" tertiary xsmall onClick={() => this.loadMore(replies.endCursor)}>
                Load more comments...
              </Button>
            </CommentReplyPost>
          </CommentReplyPost>
        )}
      </section>
    );
  }
}

const { func, object } = PropTypes;

CommentReply.propTypes = {
  ChallengeProof: object,
  client: object.isRequired,
  comment: object.isRequired,
  currentUser: object.isRequired,
  queryVariables: object.isRequired,
  renderThreadReplies: func.isRequired,
  setError: func.isRequired,
  userPoints: object.isRequired,
};

CommentReply.defaultProps = {
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default withApollo(
  connect(
    mapStateToProps,
    {}
  )(CommentReply)
);
