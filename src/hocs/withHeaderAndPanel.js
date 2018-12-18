import React, { Fragment } from 'react';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';
import LockDgdOverlay from '../components/common/blocks/lock-dgd';
// import Alert from '../components/common/elements/alert';
import SnackBar from '../components/common/elements/snackbar';
import RightPanelOverlay from '../components/common/blocks/right-panel-overlay';

import { Container, ContentWrapper } from './style';

function withHeaderAndPanel(WrappedComponent) {
  return class TemplateContainer extends React.Component {
    render() {
      return (
        <Fragment>
          <LockDgdOverlay />
          <SnackBar />
          <WalletContainer />
          <RightPanelOverlay />
          <NavBar />
          <Container>
            <LeftMenu />
            <ContentWrapper>
              <WrappedComponent {...this.props} />
            </ContentWrapper>
          </Container>
        </Fragment>
      );
    }
  };
}

export default withHeaderAndPanel;
