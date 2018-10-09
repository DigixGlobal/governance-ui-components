import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../elements/buttons/';

import { WalletWrapper } from './style';

class Wallet extends React.Component {
  render() {
    const { onWalletClick, address } = this.props;
    return (
      <WalletWrapper>
        <Button kind="capsule" onClick={onWalletClick}>
          {address || 'Load Wallet'}
        </Button>
      </WalletWrapper>
    );
  }
}

const { func, string, object, oneOfType } = PropTypes;
Wallet.propTypes = {
  onWalletClick: func.isRequired,
  address: oneOfType([string, object]),
};

Wallet.defaultProps = {
  address: undefined,
};
export default Wallet;
