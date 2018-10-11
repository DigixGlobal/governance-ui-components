import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../elements/buttons/index';
import Icon from '../../../elements/icons';
import { HR } from '../../../../common/common-styles';

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

class ConnectedWallet extends React.Component {
  render() {
    const { address: ethAddress } = this.props;
    return (
      <InnerContainer>
        <CloseButtonWithHeader>
          <Header uppercase>connected wallet </Header>
          <Icon kind="close" onClick={() => this.props.onClose()} />
        </CloseButtonWithHeader>
        <Container>
          <AddressInfo>
            Account #1
            <span>{ethAddress.address}</span>
          </AddressInfo>
          <TokenInfo>
            <TokenIcon>
              <Icon kind="ethereum" />
            </TokenIcon>
            <TokenDetails>
              <TokenValue>
                0.000232
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
                0.000232
                <span>ETH</span>
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
          <Button fullWidth disabled>
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
};

export default ConnectedWallet;
