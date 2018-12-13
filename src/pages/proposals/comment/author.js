import React from 'react';
import PropTypes from 'prop-types';

import { UserInfo } from '@digix/gov-ui/pages/proposals/comment/style';

export default class CommentAuthor extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <UserInfo>
        {user.address}
        <span>•</span>
        Reputation Points: 100
        <span>•</span>
        Quarter Points: 100
      </UserInfo>
    );
  }
}

const { object } = PropTypes;

CommentAuthor.propTypes = {
  user: object.isRequired,
};
