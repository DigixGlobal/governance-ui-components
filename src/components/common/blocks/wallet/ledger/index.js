import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';

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
          onSuccess={() => this.props.onSuccess()}
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
            <Button kind="round" secondary large icon fluid>
              <Icon kind="ledger" />
              Ledger
            </Button>
          }
        />
      )
    );
  }
}

const { func } = PropTypes;

Ledger.propTypes = {
  createKeystore: func,
  onSuccess: func.isRequired,
};

Ledger.defaultProps = {
  createKeystore: undefined,
};
export default Ledger;
