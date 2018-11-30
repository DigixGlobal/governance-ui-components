import React from 'react';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

export default class MilestoneCompletedButton extends React.Component {
  render() {
    return (
      <Button kind="round" ghost primary>
        My Milestone Is Completed
      </Button>
    );
  }
}
