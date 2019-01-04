import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@digix/gov-ui/components/common/elements/icons/index';
import {
  ButtonLink,
  IconContainer,
  EmptyStateContainer,
  EmptyStateTitle,
} from '@digix/gov-ui/pages/help/style.js';

class Help extends React.Component {
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
          <Link to="/">
            <ButtonLink kind="link">Go back to Dashboard</ButtonLink>
          </Link>
        </EmptyStateContainer>
      </div>
    );
  }
}

export default Help;
