import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';

import DGDAddress from '@digix/dao-contracts/build/contracts/MockDgd.json';

import { showHideLockDgdOverlay, canLockDgd } from '@digix/gov-ui/reducers/gov-ui/actions';

import { getAddressDetails } from '@digix/gov-ui/reducers/info-server/actions';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import { HR } from '@digix/gov-ui/components/common/common-styles';

import getContract from '@digix/gov-ui/utils/contracts';

import { InnerContainer, Header, CloseButtonWithHeader } from '../style';
import {
  Container,
  AddressInfo,
  TokenInfo,
  TokenIcon,
  TokenDetails,
  TokenValue,
  UsdEquivalent,
  DevNote,
  Notes,
} from './style';

const network = SpectrumConfig.defaultNetworks[0];
class ConnectedWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgdBalance: 0,
      ethBalance: 0,
    };
  }

  componentWillMount() {
    const { defaultAddress } = this.props;
    if (defaultAddress.address) {
      Promise.all([
        this.getEthBalance(),
        this.getDgdBalance(),
        this.props.getAddressDetails(defaultAddress.address),
      ]).then(([eth, dgd]) => this.setState({ dgdBalance: dgd, ethBalance: eth }));
    }
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);

  getDgdBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { address: contractAddress, abi } = getContract(DGDAddress);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);
    return contract.balanceOf.call(defaultAddress.address).then(balance => {
      this.props.canLockDgd(parseInt(parseBigNumber(balance, 9), 0) > 0);
      return parseBigNumber(balance, 9);
    });
  }

  getEthBalance() {
    const { defaultAddress, web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    if (defaultAddress) {
      return web3.eth
        .getBalance(defaultAddress.address)
        .then(balance => parseBigNumber(balance, 18));
    }
  }

  showLockDgdOverlay = () => {
    const { onClose, showHideLockDgdOverlayAction } = this.props;
    onClose();
    showHideLockDgdOverlayAction(true);
  };

  render() {
    const { defaultAddress } = this.props;
    const { dgdBalance, ethBalance } = this.state;
    return (
      <InnerContainer>
        <CloseButtonWithHeader>
          <Header uppercase>connected wallet </Header>
          <Icon kind="close" onClick={() => this.props.onClose()} />
        </CloseButtonWithHeader>
        <Container>
          <AddressInfo>
            Selected Address
            <span>{defaultAddress.address}</span>
          </AddressInfo>
          <TokenInfo>
            <TokenIcon>
              <Icon kind="ethereum" />
            </TokenIcon>
            <TokenDetails>
              <TokenValue>
                {ethBalance || 0}
                <span>ETH</span>
              </TokenValue>
              <UsdEquivalent>
                0.0
                <span>USD</span>
              </UsdEquivalent>
            </TokenDetails>
          </TokenInfo>
          <TokenInfo>
            <TokenIcon>
              <Icon kind="dgd" style={{ position: 'relative', top: '1px' }} />
            </TokenIcon>
            <TokenDetails>
              <TokenValue>
                {dgdBalance || 0}
                <span>DGD</span>
              </TokenValue>
              <UsdEquivalent>0.0 USD</UsdEquivalent>
            </TokenDetails>
          </TokenInfo>
          <Button fullWidth primary nobg>
            Buy DGD
          </Button>
          <HR />
          <Header uppercase>lock dgd</Header>
          <p>
            Locking your DGD in DigixDAO helps us know you are committed to the growth of the
            community and of course gives you voting power on the proposals you love to support
          </p>
          <Button
            fullWidth
            disabled={!dgdBalance || dgdBalance <= 0}
            onClick={this.showLockDgdOverlay}
          >
            lock DGD
          </Button>
          <DevNote>[DEV NOTE] Disabled when DGD is not sufficient</DevNote>
          <Notes>
            <p>NOTE:</p>
            <ul>
              <li>DO NOT use a wallet for which you do not have access to the private key</li>
              <li>
                Please note that your wallet needs to hold ETH to pay for gas transaction costs.
              </li>
              <li>
                Your locked DGD cannot be traded. You will not be able to see the balance of your
                locked DGD in your wallet. Locked DGD are only visible on this interface as long as
                your wallet is connected
              </li>
              <li>You can lock more (other) DGD anytime</li>
            </ul>
          </Notes>
        </Container>
      </InnerContainer>
    );
  }
}

const { object, func } = PropTypes;

ConnectedWallet.propTypes = {
  onClose: func.isRequired,
  getAddressDetails: func.isRequired,
  defaultAddress: object.isRequired,
  web3Redux: object.isRequired,
  showHideLockDgdOverlayAction: func.isRequired,
  canLockDgd: func.isRequired,
};

const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  lockDgdOverlay: state.govUI.LockDgdOverlay,
});

export default connect(
  mapStateToProps,
  {
    showHideLockDgdOverlayAction: showHideLockDgdOverlay,
    canLockDgd,
    getAddressDetails,
  }
)(ConnectedWallet);
