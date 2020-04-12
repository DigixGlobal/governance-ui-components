import DaoInformation from '@digix/dao-contracts/build/contracts/DaoInformation.json';
import DgdToken from '@digix/acid-contracts/build/contracts/DGDInterface.json';
import Intro from '@digix/gov-ui/components/common/blocks/wallet/intro';
import LoadWallet from '@digix/gov-ui/components/common/blocks/wallet/load-wallet';
import PropTypes from 'prop-types';
import React from 'react';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import getContract from '@digix/gov-ui/utils/contracts';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Container } from '@digix/gov-ui/components/common/blocks/wallet/style';
import { Stage } from '@digix/gov-ui/components/common/blocks/wallet/constants';
import { connect } from 'react-redux';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import {
  fetchUser,
  withApolloClient,
} from '@digix/gov-ui/pages/dissolution/api/queries';
import {
  getDefaultAddress,
  getDefaultNetworks,
} from 'spectrum-lightsuite/src/selectors';
import {
  DrawerContainer,
  TransparentOverlay,
} from '@digix/gov-ui/components/common/common-styles';
import {
  createKeystore,
  deleteKeystore,
  updateKeystore,
} from 'spectrum-lightsuite/src/actions/keystore';
import {
  setAuthentationStatus,
  showHideAlert,
  showHideWalletOverlay,
  setIsAddressLoaded,
  setIsBurnApproved,
  setLoadWalletBalance,
  setLockedDgd,
} from '@digix/gov-ui/reducers/gov-ui/actions';

const network = SpectrumConfig.defaultNetworks[0];

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

  getDgdBalance(userAddress) {
    const { web3Redux } = this.props;
    const { abi, address } = getContract(DgdToken, network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(address);

    return contract.balanceOf
      .call(userAddress)
      .then(balance => parseBigNumber(balance, 9, false));
  }

  getLockedDgd(userAddress) {
    const { web3Redux } = this.props;
    const { abi, address } = getContract(DaoInformation, network);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(address);

    return contract.readUserInfo
      .call(userAddress)
      .then(result => parseBigNumber(result[7], 9, false));
  }

  updateStage = (stage) => {
    if (!this._isMounted) {
      return;
    }

    this.setState({ stage });

    if (stage === Stage.WalletLoaded) {
      this.handleLoadedWallet();
    }
  };

  handleCloseWallet = () => {
    this.props.showHideWalletOverlay(false);
    document.body.classList.remove('modal-is-open');
  };

  handleLoadedWallet = async () => {
    const { defaultAddress: { address } } = this.props;
    this.props.client.query({
      query: fetchUser,
      variables: {
        id: address.toLowerCase(),
      },
    })
      .then((response) => {
        console.log('Address:', address.toLowerCase());
        const { user } = response.data;
        if (!user) {
          this.props.setLockedDgd(0);
          this.props.setLoadWalletBalance(0);
          this.props.setIsAddressLoaded(true);
          this.handleCloseWallet();
          return;
        }

        this.getLockedDgd(address).then((dgdLocked) => {
          console.log('Value of DaoStakeLocking.lockedDGDAmount:', dgdLocked);
          this.props.setLockedDgd(Number(dgdLocked));
          this.getDgdBalance(address)
            .then((dgdBalance) => {
              this.props.setLoadWalletBalance(Number(dgdBalance));
              this.props.setIsAddressLoaded(true);
              this.handleCloseWallet();
            });
        });
      });
  }

  render() {
    const { stage, lockingDgd } = this.state;
    const { showWallet, ...rest } = this.props;

    if (!showWallet || !showWallet.show || lockingDgd) {
      return null;
    }

    return (
      <Container>
        <TransparentOverlay />
        <DrawerContainer>
          {(stage === Stage.Intro || stage === Stage.WalletLoaded) && (
            <Intro
              currentStage={stage}
              onClose={() => this.handleCloseWallet()}
              onChangeStage={this.updateStage}
            />
          )}
          {stage === Stage.LoadingWallet && (
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

const {
  array,
  bool,
  func,
  object,
} = PropTypes;

Wallet.propTypes = {
  client: object.isRequired,
  defaultAddress: object,
  defaultNetworks: array.isRequired,
  isAuthenticated: bool,
  showHideAlert: func.isRequired,
  setIsAddressLoaded: func.isRequired,
  setIsBurnApproved: func.isRequired,
  setLoadWalletBalance: func.isRequired,
  setLockedDgd: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  showWallet: object,
  signingModal: object,
  web3Redux: object.isRequired,
};

Wallet.defaultProps = {
  defaultAddress: {
    address: undefined,
  },
  isAuthenticated: false,
  showWallet: undefined,
  signingModal: undefined,
};

const actions = {
  createKeystore,
  deleteKeystore,
  updateKeystore,
  setAuthentationStatus,
  showHideAlert,
  setIsAddressLoaded,
  setIsBurnApproved,
  setLoadWalletBalance,
  setLockedDgd,
  showHideWalletOverlay,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  defaultNetworks: getDefaultNetworks(state),
  isAuthenticated: state.govUI.isAuthenticated,
  showWallet: state.govUI.ShowWallet,
});

export default withApolloClient(
  web3Connect(
    connect(mapStateToProps, actions)(Wallet)
  )
);
