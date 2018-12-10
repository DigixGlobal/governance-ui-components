import React from 'react';
import { UpVote } from './style';
import Icon from '../icons';

export default class Vote extends React.Component {
  render() {
    return (
      <UpVote href="./" style={{ pointerEvents: 'none' }}>
        <Icon kind="like" />
        LIKE
      </UpVote>
    );
  }
}
