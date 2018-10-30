import React, { Fragment } from 'react';

import NavBar from '../components/common/blocks/navbar';
import WalletContainer from '../components/common/blocks/wallet';

import LeftMenu from '../components/common/blocks/collapsible-menu';

import { Container, ContentWrapper } from './style';

function withHeaderAndPanel(WrappedComponent) {
  return class TemplateContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showWallet: false,
      };
    }

    handleWalletClick = () => {
      if (!this.state.showWallet) {
        document.body.classList.toggle('modal-is-open');
      } else {
        document.body.classList.remove('modal-is-open');
      }
      this.setState({ showWallet: !this.state.showWallet });
    };

    render() {
      const { showWallet } = this.state;
      return (
        <Fragment>
          <WalletContainer show={showWallet} onClose={this.handleWalletClick} />
          <NavBar onWalletClick={this.handleWalletClick} />
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
