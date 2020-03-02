import { Container } from '@digix/gov-ui/components/common/blocks/wallet/style';
import Intro from '@digix/gov-ui/components/common/blocks/wallet/intro';
import LoadWallet from '@digix/gov-ui/components/common/blocks/wallet/load-wallet';
import PropTypes from 'prop-types';
import React from 'react';
import { Stage } from '@digix/gov-ui/components/common/blocks/wallet/constants';
import { connect } from 'react-redux';
import { getDefaultNetworks } from 'spectrum-lightsuite/src/selectors';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { TransparentOverlay, DrawerContainer } from '@digix/gov-ui/components/common/common-styles';
import {
  createKeystore,
  updateKeystore,
  deleteKeystore,
} from 'spectrum-lightsuite/src/actions/keystore';
import {
  setAuthentationStatus,
  showHideAlert,
  showHideWalletOverlay,
} from '@digix/gov-ui/reducers/gov-ui/actions';

export class Wallet extends React.PureComponent {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      stage: Stage.Intro,
      lockingDgd: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateStage = stage => {
    if (!this._isMounted) {
      return;
    }

    this.setState({ stage });
    if (stage === Stage.WalletLoaded) {
      this.handleCloseWallet();
    }
  };

  handleCloseWallet = () => {
    this.props.showHideWalletOverlay(false);
    document.body.classList.remove('modal-is-open');
  };

  render() {
    const { stage, lockingDgd } = this.state;
    const { showWallet, isAuthenticated, ...rest } = this.props;

    if (!showWallet || !showWallet.show || lockingDgd) {
      return null;
    }

    return (
      <Container>
        <TransparentOverlay />
        <DrawerContainer>
          {stage === Stage.Intro && !isAuthenticated && (
            <Intro onClose={() => this.handleCloseWallet()} onChangeStage={this.updateStage} />
          )}

          {stage === Stage.LoadingWallet && !isAuthenticated && (
            <LoadWallet
              {...rest}
              onChangeStage={this.updateStage}
              onClose={() => this.handleCloseWallet()}
            />
          )}
        </DrawerContainer>
      </Container>
    );
  }
}

const { func, object, bool, array } = PropTypes;
Wallet.propTypes = {
  showWallet: object,
  signingModal: object,
  isAuthenticated: bool,
  defaultNetworks: array.isRequired,
  showHideAlert: func.isRequired,
  showHideWalletOverlay: func.isRequired,
};

Wallet.defaultProps = {
  showWallet: undefined,
  isAuthenticated: false,
  signingModal: undefined,
};

const actions = {
  createKeystore,
  updateKeystore,
  deleteKeystore,
  showHideAlert,
  setAuthentationStatus,
  showHideWalletOverlay,
};

const mapStateToProps = state => ({
  defaultNetworks: getDefaultNetworks(state),
  showWallet: state.govUI.ShowWallet,
  isAuthenticated: state.govUI.isAuthenticated,
});

export default web3Connect(connect(mapStateToProps, actions)(Wallet));
