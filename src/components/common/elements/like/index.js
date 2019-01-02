import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icons';
import { Button } from '../index';

class LikeButton extends React.Component {
  render() {
    const { hasVoted, onClick } = this.props;
    return (
      <Button kind="text" active={hasVoted} onClick={onClick}>
        <Icon kind="like" active={hasVoted} />
        {hasVoted ? 'UNLIKE' : 'LIKE'}
      </Button>
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
