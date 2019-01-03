import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';

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
          onSuccess={() => this.props.onSuccess()}
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
            <Button kind="round" secondary fluid icon large>
              <Icon kind="trezor" />
              Trezor
            </Button>
          }
        />
      )
    );
  }
}

const { func } = PropTypes;

Trezor.propTypes = {
  createKeystore: func,
  onSuccess: func.isRequired,
};

Trezor.defaultProps = {
  createKeystore: undefined,
};
export default Trezor;
