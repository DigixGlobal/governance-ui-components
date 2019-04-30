import PropTypes from 'prop-types';
import React from 'react';
import Markdown from 'react-markdown';
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

    const {
      data: { comment },
    } = props.translations;
    this.DELETE_MESSAGE = comment.removed || 'This comment has been removed.';
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
    const {
      currentUser,
      translations: {
        data: {
          common: { buttons },
        },
      },
    } = this.props;
    if ((currentUser && !currentUser.isForumAdmin) || currentUser == null) {
      return null;
    }

    const { comment } = this.state;
    const { id, isBanned } = comment;

    if (isBanned) {
      return (
        <ButtonGroup first>
          <ActionCommentButton kind="text" admin small onClick={() => this.showComment(true, id)}>
            <Icon kind="restore" />
            <span>{buttons.restore || 'Restore'}</span>
          </ActionCommentButton>
        </ButtonGroup>
      );
    }

    return (
      <ButtonGroup>
        <ActionCommentButton kind="text" admin small onClick={() => this.showComment(false, id)}>
          <Icon kind="delete" />
          <span>{buttons.remove || 'Remove'}</span>
        </ActionCommentButton>
      </ButtonGroup>
    );
  }

  renderActionBar() {
    if (this.state.comment.isBanned) {
      return null;
    }

    const {
      currentUser,
      toggleEditor,
      translations: {
        data: { project },
      },
    } = this.props;
    const { comment } = this.state;
    const { body, liked, likes, user } = comment;
    const { canComment, isForumAdmin } = currentUser || { canComment: false, isForumAdmin: false };

    const isDeleted = !body;
    const canReply = canComment || (isForumAdmin && !isDeleted);
    const isAuthor = user && currentUser != null && currentUser.address === user.address;
    const likeLabel = likes === 1 && likes != null ? project.like : project.likes;

    return (
      <ButtonGroup first>
        {canReply && (
          <ActionCommentButton kind="text" small onClick={() => toggleEditor()}>
            <Icon kind="reply" />
            <span>{project.reply}</span>
          </ActionCommentButton>
        )}

        {canComment && (
          <ActionCommentButton
            kind="text"
            small
            disabled={!canComment}
            active={liked}
            onClick={() => this.toggleLike()}
          >
            <Icon active={liked} kind="like" />
            <span>
              {likes != null ? likes : 0}&nbsp;{likeLabel}
            </span>
          </ActionCommentButton>
        )}

        {isAuthor && (
          <ActionCommentButton kind="text" small onClick={() => this.deleteComment()}>
            <Icon kind="trash" />
            <span>{project.trash}</span>
          </ActionCommentButton>
        )}
      </ButtonGroup>
    );
  }

  render() {
    const { currentUser, translations } = this.props;
    const { comment } = this.state;
    const { body, isBanned, user } = comment;
    const isForumAdmin = currentUser != null ? currentUser : false;

    const isDeleted = !body;
    const isHidden = isForumAdmin && isBanned;
    const showActionBar = !isDeleted && (isForumAdmin || !isHidden);
    const commentMessage = isDeleted ? this.DELETE_MESSAGE : body;
    const { canComment } = currentUser || { canComment: false };

    return (
      <CommentListItem>
        <CommentAuthor hide={isDeleted} user={user} translations={translations} />
        <CommentPost isHidden={isHidden} deleted={isDeleted}>
          <Content data-digix="Comment-Message">
            <Markdown source={commentMessage} escapeHtml={false} />
          </Content>
          {showActionBar && canComment && (
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
  currentUser: object,
  ChallengeProof: object,
  hideEditor: func.isRequired,
  setError: func.isRequired,
  toggleEditor: func.isRequired,
  translations: object.isRequired,
};

Comment.defaultProps = {
  ChallengeProof: undefined,
  currentUser: null,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
  translations: state.daoServer.Translations,
});

export default withApollo(
  connect(
    mapStateToProps,
    {}
  )(Comment)
);
