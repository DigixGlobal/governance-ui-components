import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '@digix/gov-ui/pages/proposals/comment/style';

export default class CommentAuthor extends React.Component {
  render() {
    const { user, userPoints } = this.props;

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

const { object } = PropTypes;

CommentAuthor.propTypes = {
  user: object.isRequired,
  userPoints: object.isRequired,
};
