import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import CommentAuthor from '@digix/gov-ui/pages/proposals/comment/author';
import { Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  ActionBar,
  CommentPost,
  ActionCommentButton,
} from '@digix/gov-ui/pages/proposals/comment/style';
import { CommentsApi } from '@digix/gov-ui/api/comments';
import { initializePayload } from '@digix/gov-ui/api';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment,
    };

    this.DELETE_MESSAGE = 'This message has been removed.';
  }

  deleteComment() {
    const { comment } = this.state;
    const { ChallengeProof, setError } = this.props;

    comment.body = null;
    this.setState({ comment });

    if (ChallengeProof.data) {
      const payload = initializePayload(ChallengeProof);
      CommentsApi.delete(comment.id, payload).catch(() => {
        setError(CommentsApi.ERROR_MESSAGES.remove);
      });
    }
  }

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

  render() {
    const { currentUser, toggleEditor, userPoints } = this.props;
    const { comment } = this.state;
    const { body, liked, likes, user } = comment;

    const isAuthor = user && currentUser.address === user.address;
    const isDeleted = !body;
    const likeLabel = likes === 1 ? 'Like' : 'Likes';

    return (
      <article className="comment">
        <CommentAuthor hide={isDeleted} user={user} userPoints={userPoints} />
        <CommentPost deleted={isDeleted}>
          {body || this.DELETE_MESSAGE}
          {body && (
            <ActionBar>
              <ActionCommentButton kind="text" small onClick={() => toggleEditor()}>
                <Icon kind="reply" />
                <span>Reply</span>
              </ActionCommentButton>
              <ActionCommentButton
                kind="text"
                small
                active={liked}
                onClick={() => this.toggleLike()}
              >
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
            </ActionBar>
          )}
        </CommentPost>
      </article>
    );
  }
}

const { func, object, string } = PropTypes;

Comment.propTypes = {
  comment: object.isRequired,
  currentUser: object.isRequired,
  ChallengeProof: object,
  setError: func.isRequired,
  toggleEditor: func,
  userPoints: object.isRequired,
};

Comment.defaultProps = {
  ChallengeProof: undefined,
  toggleEditor: undefined,
};

const mapStateToProps = state => ({
  ChallengeProof: state.daoServer.ChallengeProof,
});

export default connect(
  mapStateToProps,
  {}
)(Comment);
