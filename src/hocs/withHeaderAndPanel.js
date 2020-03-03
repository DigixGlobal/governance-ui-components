import _ from 'lodash';
import LockDgdOverlay from '@digix/gov-ui/components/common/blocks/lock-dgd';
import NavBar from '@digix/gov-ui/components/common/blocks/navbar';
import PropTypes from 'prop-types';
import RightPanelOverlay from '@digix/gov-ui/components/common/blocks/right-panel-overlay';
import SnackBar from '@digix/gov-ui/components/common/elements/snackbar';
import UnderMaintenance from '@digix/gov-ui/components/common/blocks/loader/under-maintenance';
import WalletContainer from '@digix/gov-ui/components/common/blocks/wallet';
import { withAppUser } from '@digix/gov-ui/api/graphql-queries/users';
import React, { Fragment } from 'react';
import { Container, ContentWrapper } from './style';
import './style.css';

function withHeaderAndPanel(WrappedComponent) {
  class TemplateContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuOpen: false,
      };
    }

    shouldComponentUpdate = (nextProps, nextState) =>
      !_.isEqual(this.props, nextProps) && !_.isEqual(this.state, nextState);

    render() {
      const {
        appUser: { isUnderMaintenance },
      } = this.props;

      // TODO: remove sign proof
      return (
        <Fragment>
          <LockDgdOverlay />
          <SnackBar />
          <WalletContainer />
          <RightPanelOverlay />
          <NavBar />
          <Container id="App" style={{ height: '100%' }}>
            <ContentWrapper id="page-wrap">
              {isUnderMaintenance && <UnderMaintenance />}
              {!isUnderMaintenance && <WrappedComponent {...this.props} />}
            </ContentWrapper>
          </Container>
        </Fragment>
      );
    }
  }

  const { object } = PropTypes;
  TemplateContainer.propTypes = {
    location: object.isRequired,
    appUser: object.isRequired,
  };

  return withAppUser(TemplateContainer);
}

export default withHeaderAndPanel;
