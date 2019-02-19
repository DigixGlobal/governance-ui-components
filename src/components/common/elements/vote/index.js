import React from 'react';
import { UpVote } from './style';

export default class Vote extends React.Component {
  render() {
    return (
      <UpVote hasVoted href="./" style={{ pointerEvents: 'none' }}>
        <i />
        LIKE
      </UpVote>
    );
  }
}
