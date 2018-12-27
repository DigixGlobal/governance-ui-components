import React from 'react';
import Icon from '@digix/gov-ui/components/common/elements/icons/index';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import { EmptyStateContainer, EmptyStateTitle, IconContainer, ButtonLink } from './style';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <EmptyStateContainer>
          <IconContainer>
            <Icon kind="profile" width="80px" height="80px" />
          </IconContainer>

          <EmptyStateTitle>There's Nothing Here Yet!</EmptyStateTitle>
          <p>
            This page will be updated very soon. Please feel free to look around and check back
            often for updates!
          </p>
          <ButtonLink kind="link" href="/#">
            Go back to Dashboard
          </ButtonLink>
        </EmptyStateContainer>
      </div>
    );
  }
}

export default Wallet;
