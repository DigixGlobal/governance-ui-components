import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { ERC20_ABI } from 'spectrum-lightsuite/src/helpers/constants';
import { parseBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';

import DGDAddress from '@digix/dao-contracts/build/contracts/MockDgd.json';

import { showHideLockDgdOverlay } from '../../../../../reducers/gov-ui/actions';

import Button from '../../../elements/buttons/index';
import Icon from '../../../elements/icons';
import { HR } from '../../../../common/common-styles';

// import { DEFAULT_NETWORK, DGD_ADDRESS } from '../../../../../constants';

import getContract from '../../../../../utils/contracts';

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
    Promise.all([this.getEthBalance(), this.getDgdbalance()]).then(([eth, dgd]) =>
      this.setState({ dgdBalance: dgd, ethBalance: eth })
    );
  }

  getDgdbalance() {
    const { address: ethAddress, web3Redux } = this.props;
    const { address: contractAddress, abi } = getContract(DGDAddress);
    const { web3 } = web3Redux.networks[network];
    const contract = web3.eth.contract(abi).at(contractAddress);
    return contract.balanceOf.call(ethAddress.address).then(balance => parseBigNumber(balance, 9));
  }

  getEthBalance() {
    const { address: ethAddress, web3Redux } = this.props;
    const { web3 } = web3Redux.networks[network];
    if (ethAddress) {
      return web3.eth.getBalance(ethAddress.address).then(balance => parseBigNumber(balance, 18));
    }
  }

  showLockDgdOverlay = () => {
    const { onClose, showHideLockDgdOverlayAction } = this.props;
    onClose();
    showHideLockDgdOverlayAction(true);
  };

  render() {
    const { address: ethAddress } = this.props;
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
            <span>{ethAddress.address}</span>
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
  address: object.isRequired,
  web3Redux: object.isRequired,
  showHideLockDgdOverlayAction: func.isRequired,
};

export default connect(
  ({ govUI: { LockDgdOverlay } }) => ({
    lockDgdOverlay: LockDgdOverlay,
  }),
  {
    showHideLockDgdOverlayAction: showHideLockDgdOverlay,
  }
)(ConnectedWallet);
