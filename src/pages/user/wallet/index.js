import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import QuarterSummary from '@digix/gov-ui/pages/user/wallet/sections/quarter-summary';
import WalletCurrencies from '@digix/gov-ui/pages/user/wallet/sections/wallet-currencies';
import { Address, Heading, WalletWrapper } from '@digix/gov-ui/pages/user/wallet/style';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';

class Wallet extends React.Component {
  render() {
    const { address } = this.props.AddressDetails;
    const t = this.props.Translations.data.wallet;

    return (
      <WalletWrapper>
        <Heading>{t.title}</Heading>
        <Address>
          <span>{t.address}:</span>
          <span data-digix="Wallet-Address">{address}</span>
        </Address>
        <WalletCurrencies />
        <QuarterSummary translations={t} />
      </WalletWrapper>
    );
  }
}

const { object } = PropTypes;
Wallet.propTypes = {
  AddressDetails: object.isRequired,
  Translations: object.isRequired,
};

const mapStateToProps = state => ({
  Translations: state.daoServer.Translations,
});

export default connect(mapStateToProps)(withFetchAddress(Wallet));
