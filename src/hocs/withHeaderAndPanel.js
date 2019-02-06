import React, { Fragment } from 'react';
import _ from 'lodash';
import { push as Menu } from 'react-burger-menu';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';
import LockDgdOverlay from '../components/common/blocks/lock-dgd';
import SnackBar from '../components/common/elements/snackbar';
import RightPanelOverlay from '../components/common/blocks/right-panel-overlay';

import { Container, ContentWrapper } from './style';
import './style.css';

function withHeaderAndPanel(WrappedComponent) {
  return class TemplateContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        menuOpen: false,
      };
    }

    shouldComponentUpdate = (nextProps, nextState) =>
      !_.isEqual(this.props, nextProps) && !_.isEqual(this.state, nextState);

    // This keeps your state in sync with the opening/closing of the menu
    // via the default means, e.g. clicking the X, pressing the ESC key etc.
    handleStateChange(state) {
      this.setState({ menuOpen: state.isOpen });
    }

    // This can be used to close the menu, e.g. when a user clicks a menu item
    closeMenu() {
      this.setState({ menuOpen: false });
    }

    render() {
      return (
        <Fragment>
          <LockDgdOverlay />
          <SnackBar />
          <WalletContainer />
          <RightPanelOverlay />
          <NavBar />
          <Container id="App" style={{ height: '100%'}}>
            <Menu
              noOverlay
              pageWrapId="page-wrap"
              outerContainerId="App"
              isOpen={this.state.menuOpen}
              onStateChange={state => this.handleStateChange(state)}
            >
              <LeftMenu location={this.props.location} />
            </Menu>

            <ContentWrapper id="page-wrap">
              <WrappedComponent {...this.props} />
            </ContentWrapper>
          </Container>
        </Fragment>
      );
    }
  };
}

export default withHeaderAndPanel;
