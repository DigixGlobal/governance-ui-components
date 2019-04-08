import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '@digix/gov-ui/pages/proposals/comment/style';

export default class CommentAuthor extends React.Component {
  render() {
    const {
      hide,
      user,
      userPoints,
      translations: {
        data: {
          dashboard: { UserStats },
        },
      },
    } = this.props;
    if (hide) {
      return null;
    }

    const points = userPoints[user.address];
    const reputationPoints = points ? points.reputation : 0;
    const quarterPoints = points ? points.quarterPoints : 0;

    return (
      <UserInfo>
        <span data-digix="CommentAuthor-DisplayName">{user.displayName}</span>
        <span>&bull;</span>
        <span data-digix="CommentAuthor-Reputation">
          {UserStats.reputationPoints}: {reputationPoints}
        </span>
        <span>&bull;</span>
        <span data-digix="CommentAuthor-QuarterPoints">
          {UserStats.quarterPoints}: {quarterPoints}
        </span>
      </UserInfo>
    );
  }
}

const { bool, object } = PropTypes;

CommentAuthor.propTypes = {
  hide: bool,
  user: object.isRequired,
  userPoints: object.isRequired,
  translations: object.isRequired,
};

CommentAuthor.defaultProps = {
  hide: false,
};
