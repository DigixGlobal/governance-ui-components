import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import CommentAuthor from '@digix/gov-ui/pages/proposals/comment/author';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { hideComment, unhideComment } from '@digix/gov-ui/api/graphql-queries/comments';
import { Icon } from '@digix/gov-ui/components/common/elements/index';
import { initializePayload } from '@digix/gov-ui/api';
import { withApollo } from 'react-apollo';

import {
  CommentListItem,
  ActionBar,
  ButtonGroup,
  Content,
  CommentPost,
  ActionCommentButton,
} from '@digix/gov-ui/pages/proposals/comment/style';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: props.comment,
    };

    this.DELETE_MESSAGE = 'This message has been removed.';
  }

  deleteComment() {
    const { comment } = this.state;
    const { ChallengeProof, setError } = this.props;

    comment.body = null;
    this.props.hideEditor();
    this.setState({ comment });

    if (ChallengeProof.data) {
      const payload = initializePayload(ChallengeProof);
      CommentsApi.delete(comment.id, payload).catch(() => {
        setError(CommentsApi.ERROR_MESSAGES.remove);
      });
    }
  }

  showComment = (show, id) => {
    const { comment } = this.state;
    const apollo = this.props.client;
    const mutation = show ? unhideComment : hideComment;
    const mutationName = show ? 'unbanComment' : 'banComment';

    if (!show) {
      this.props.hideEditor();
    }

    apollo
      .mutate({
        mutation,
        variables: { id },
      })
      .then(response => {
        const { errors } = response.data[mutationName];
        if (errors.length > 0) {
          this.props.setError(errors.message[0]);
          return;
        }

        comment.isBanned = !show;
        this.setState({ comment });
      })
      .catch(() => {
        this.props.setError(CommentsApi.ERROR_MESSAGES[mutation]);
      });
  };

  toggleLike = () => {
    const { comment } = this.state;
    const { ChallengeProof, setError } = this.props;

    comment.liked = !comment.liked;
    comment.likes = comment.liked ? comment.likes + 1 : comment.likes - 1;
    const request = comment.liked ? 'like' : 'unlike';
    this.setState({ comment });

    if (ChallengeProof.data) {
      const payload = initializePayload(ChallengeProof);
      CommentsApi[request](comment.id, payload).catch(() => {
        setError(CommentsApi.ERROR_MESSAGES[request]);
      });
    }
  };

  renderForumAdminActionBar() {
    if (!this.props.currentUser.isForumAdmin) {
      return null;
    }

    const { comment } = this.state;
    const { id, isBanned } = comment;

    if (isBanned) {
      return (
        <ButtonGroup first>
          <ActionCommentButton kind="text" admin small onClick={() => this.showComment(true, id)}>
            <Icon kind="restore" />
            <span>Restore</span>
          </ActionCommentButton>
        </ButtonGroup>
      );
    }

    return (
      <ButtonGroup>
        <ActionCommentButton kind="text" admin small onClick={() => this.showComment(false, id)}>
          <Icon kind="delete" />
          <span>Remove</span>
        </ActionCommentButton>
      </ButtonGroup>
    );
  }

  renderActionBar() {
    if (this.state.comment.isBanned) {
      return null;
    }

    const { currentUser, toggleEditor } = this.props;
    const { comment } = this.state;
    const { body, liked, likes, user } = comment;
    const { canComment, isForumAdmin } = currentUser;

    const isDeleted = !body;
    const canReply = canComment || (isForumAdmin && !isDeleted);
    const isAuthor = user && currentUser.address === user.address;
    const likeLabel = likes === 1 ? 'Like' : 'Likes';

    return (
      <ButtonGroup first>
        {canReply && (
          <ActionCommentButton kind="text" small onClick={() => toggleEditor()}>
            <Icon kind="reply" />
            <span>Reply</span>
          </ActionCommentButton>
        )}
        <ActionCommentButton kind="text" small active={liked} onClick={() => this.toggleLike()}>
          <Icon active={liked} kind="like" />
          <span>
            {likes}&nbsp;{likeLabel}
          </span>
        </ActionCommentButton>
        {isAuthor && (
          <ActionCommentButton kind="text" small onClick={() => this.deleteComment()}>
            <Icon kind="trash" />
            <span>Trash</span>
          </ActionCommentButton>
        )}
      </ButtonGroup>
    );
  }

  render() {
    const { currentUser, userPoints } = this.props;
    const { comment } = this.state;
    const { body, isBanned, user } = comment;
    const { isForumAdmin } = currentUser;

    const isDeleted = !body;
    const isHidden = isForumAdmin && isBanned;
    const showActionBar = !isDeleted && (isForumAdmin || !isHidden);
    const commentMessage = isDeleted ? this.DELETE_MESSAGE : body;

    return (
      <CommentListItem>
        <CommentAuthor hide={isDeleted} user={user} userPoints={userPoints} />
        <CommentPost isHidden={isHidden} deleted={isDeleted}>
          <Content>{commentMessage}</Content>
          {showActionBar && (
            <ActionBar>
              {this.renderActionBar()}
              {this.renderForumAdminActionBar()}
            </ActionBar>
          )}
        </CommentPost>
      </CommentListItem>
    );
  }
}

const { func, object } = PropTypes;

Comment.propTypes = {
  client: object.isRequired,
  comment: object.isRequired,
  currentUser: object.isRequired,
  ChallengeProof: object,
  hideEditor: func.isRequired,
  setError: func.isRequired,
  toggleEditor: func.isRequired,
  userPoints: object.isRequired,
};

Comment.defaultProps = {
  ChallengeProof: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default withApollo(
  connect(
    mapStateToProps,
    {}
  )(Comment)
);
