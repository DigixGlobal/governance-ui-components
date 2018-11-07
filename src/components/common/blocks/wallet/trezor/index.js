import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import { WalletItem } from '../style';
import Button from '../../../../common/elements/buttons/index';
import Icon from '../../../../common/elements/icons';

class Trezor extends React.Component {
  render() {
    return (
      (
        <DefaultAddressSelector
          inverted
          key="trezor-address-selector"
          renderBottom={false}
          name="from"
          keystoreType="trezor"
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <KeystoreModal
          createKeystore={this.props.createKeystore}
          onClose={this.resetState}
          showBalances
          key="trezor-popup"
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          creatingKeyStore
          data={{ type: 'trezor', updateDefaultAddress: true }}
          header="Load Trezor Wallet"
          hideSelector
          allowedKeystoreTypes={['trezor']}
          trigger={
            <WalletItem>
              <Button primary ghost fluid>
                <Icon kind="trezor" />
                Trezor
              </Button>
            </WalletItem>
          }
        />
      )
    );
  }
}

Trezor.propTypes = {
  createKeystore: PropTypes.func,
};

Trezor.defaultProps = {
  createKeystore: undefined,
};
export default Trezor;
