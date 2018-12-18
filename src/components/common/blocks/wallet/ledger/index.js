import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import { WalletItem } from '../style';
import Button from '../../../../common/elements/buttons/index';
import Icon from '../../../../common/elements/icons';

class Ledger extends React.Component {
  render() {
    return (
      (
        <DefaultAddressSelector
          inverted
          key="addressSelector"
          renderBottom={false}
          name="from"
          keystoreType="ledger"
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <KeystoreModal
          createKeystore={this.props.createKeystore}
          onClose={this.resetState}
          showBalances
          key="keystore-popup"
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          creatingKeyStore
          data={{ type: 'ledger', updateDefaultAddress: true }}
          header="Load Ledger Wallet"
          hideSelector
          allowedKeystoreTypes={['ledger']}
          trigger={
            <WalletItem>
              <Button primary filled fluid iconButton>
                <Icon kind="ledger" />
                Ledger
              </Button>
            </WalletItem>
          }
        />
      )
    );
  }
}

Ledger.propTypes = {
  createKeystore: PropTypes.func,
};

Ledger.defaultProps = {
  createKeystore: undefined,
};
export default Ledger;
