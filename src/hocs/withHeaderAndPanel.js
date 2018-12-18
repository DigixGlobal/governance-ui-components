import React, { Fragment } from 'react';
import _ from 'lodash';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';
import LockDgdOverlay from '../components/common/blocks/lock-dgd';
import SnackBar from '../components/common/elements/snackbar';
import RightPanelOverlay from '../components/common/blocks/right-panel-overlay';

import { Container, ContentWrapper } from './style';

function withHeaderAndPanel(WrappedComponent) {
  return class TemplateContainer extends React.Component {
    shouldComponentUpdate = (nextProps, nextState) =>
      !_.isEqual(this.props, nextProps) && !_.isEqual(this.state, nextState);

    render() {
      return (
        <Fragment>
          <LockDgdOverlay />
          <SnackBar />
          <WalletContainer />
          <RightPanelOverlay />
          <NavBar />
          <Container>
            <LeftMenu location={this.props.location} />
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
