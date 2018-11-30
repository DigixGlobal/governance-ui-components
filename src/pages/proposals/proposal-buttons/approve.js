import React from 'react';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

export default class ApproveButton extends React.Component {
  render() {
    return (
      <Button kind="round" ghost primary>
        Approve
      </Button>
    );
  }
}
