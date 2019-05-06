import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import NavBar from '@digix/gov-ui/components/common/blocks/navbar';
import WalletContainer from '@digix/gov-ui/components/common/blocks/wallet';

import LeftMenu from '@digix/gov-ui/components/common/blocks/collapsible-menu';
import LockDgdOverlay from '@digix/gov-ui/components/common/blocks/lock-dgd';
import AddressWatcher from '@digix/gov-ui/components/common/blocks/address-watcher';
import SnackBar from '@digix/gov-ui/components/common/elements/snackbar';
import RightPanelOverlay from '@digix/gov-ui/components/common/blocks/right-panel-overlay';
import UnderMaintenance from '@digix/gov-ui/components/common/blocks/loader/maintenance';

import { withAppUser } from '@digix/gov-ui/api/graphql-queries/users';

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
      return (
        <Fragment>
          <LockDgdOverlay />
          <AddressWatcher />
          <SnackBar />
          <WalletContainer />
          <RightPanelOverlay />
          <NavBar />
          <Container id="App" style={{ height: '100%' }}>
            <LeftMenu location={this.props.location} />
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
