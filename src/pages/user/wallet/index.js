import React from 'react';
import PropTypes from 'prop-types';

import QuarterSummary from '@digix/gov-ui/pages/user/wallet/sections/quarter-summary';
import WalletCurrencies from '@digix/gov-ui/pages/user/wallet/sections/wallet-currencies';
import { Address, Heading, WalletWrapper } from '@digix/gov-ui/pages/user/wallet/style';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

class Wallet extends React.Component {
  render() {
    const { address } = this.props.AddressDetails;

    return (
      <WalletWrapper>
        <Heading>Wallet</Heading>
        <Address>
          <span>Address:</span>
          <span data-digix="Wallet-Address">{address}</span>
        </Address>
        <WalletCurrencies />
        <QuarterSummary />
      </WalletWrapper>
    );
  }
}

const { object } = PropTypes;
Wallet.propTypes = {
  AddressDetails: object.isRequired,
};

export default withFetchAddress(Wallet);
