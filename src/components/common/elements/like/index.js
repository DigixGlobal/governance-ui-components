import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icons';
import { Button } from '../index';

class LikeButton extends React.Component {
  render() {
    const { hasVoted, onClick, likes } = this.props;
    const likeMessage = likes && likes > 0 ? `${likes} Likes` : '0 Like';
    return (
      <Button kind="text" active={hasVoted} onClick={onClick}>
        <Icon kind="like" active={hasVoted} />
        {likeMessage}
      </Button>
    );
  }
}

const { bool, func, number } = PropTypes;

LikeButton.propTypes = {
  onClick: func,
  hasVoted: bool,
  likes: number,
};

LikeButton.defaultProps = {
  hasVoted: false,
  onClick: undefined,
  likes: undefined,
};

export default LikeButton;
