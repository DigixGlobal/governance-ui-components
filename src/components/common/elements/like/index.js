import React from 'react';
import PropTypes from 'prop-types';

import { UpVote } from './style';
import Icon from '../icons';

class LikeButton extends React.Component {
  render() {
    const { hasVoted, onClick } = this.props;
    return (
      <UpVote hasVoted={hasVoted} onClick={onClick}>
        <Icon kind="like" active={hasVoted} />
        {hasVoted ? 'UNLIKE' : 'LIKE'}
      </UpVote>
    );
  }
}

const { bool, func } = PropTypes;

LikeButton.propTypes = {
  onClick: func,
  hasVoted: bool,
};

LikeButton.defaultProps = {
  hasVoted: false,
  onClick: undefined,
};

export default LikeButton;
