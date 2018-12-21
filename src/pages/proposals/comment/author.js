import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '@digix/gov-ui/pages/proposals/comment/style';

export default class CommentAuthor extends React.Component {
  render() {
    const { hide, user, userPoints } = this.props;
    if (hide) {
      return null;
    }

    const points = userPoints[user.address];
    const reputationPoints = points ? points.reputation : 0;
    const quarterPoints = points ? points.quarterPoints : 0;

    return (
      <UserInfo>
        {user.address}
        <span>•</span>
        <span>Reputation Points: {reputationPoints}</span>
        <span>•</span>
        <span>Quarter Points: {quarterPoints}</span>
      </UserInfo>
    );
  }
}

const { bool, object } = PropTypes;

CommentAuthor.propTypes = {
  hide: bool,
  user: object.isRequired,
  userPoints: object.isRequired,
};

CommentAuthor.defaultProps = {
  hide: false,
};
