import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '@digix/gov-ui/pages/proposals/comment/style';
import { getElapsedTime } from '@digix/gov-ui/utils/timeDateUtils';

export default class CommentAuthor extends React.Component {
  render() {
    const {
      hide,
      user,
      createdAt,
      translations: {
        data: {
          dashboard: { UserStats },
        },
      },
    } = this.props;

    if (hide) {
      return null;
    }

    return (
      <UserInfo>
        <span data-digix="CommentAuthor-DisplayName">{user.displayName}</span>
        <span>&bull;</span>
        <span data-digix="CommentAuthor-Reputation">
          {UserStats.reputationPoints}: {user.reputationPoint}
        </span>
        <span>&bull;</span>
        <span data-digix="CommentAuthor-QuarterPoints">
          {UserStats.quarterPoints}: {user.quarterPoint}
        </span>
        {createdAt && (
          <React.Fragment>
            <span>&bull;</span>
            <span data-digix="CommentAuthor-QuarterPoints">{getElapsedTime(createdAt)}</span>
          </React.Fragment>
        )}
      </UserInfo>
    );
  }
}

const { bool, object, string } = PropTypes;

CommentAuthor.propTypes = {
  hide: bool,
  user: object.isRequired,
  translations: object.isRequired,
  createdAt: string,
};

CommentAuthor.defaultProps = {
  hide: false,
  createdAt: '',
};
