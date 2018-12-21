import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import Button from '../../../../common/elements/buttons/index';
import Icon from '../../../../common/elements/icons';

class Metamask extends React.Component {
  render() {
    return (
      (
        <DefaultAddressSelector
          inverted
          key="metamask-address-selector"
          renderBottom={false}
          name="from"
          keystoreType="metamask"
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <KeystoreModal
          createKeystore={this.props.createKeystore}
          onClose={this.resetState}
          key="metamask-popup"
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          creatingKeyStore
          data={{ type: 'metamask', updateDefaultAddress: true }}
          header="Load MetaMask Wallet"
          hideSelector
          allowedKeystoreTypes={['metamask']}
          trigger={
            <Button kind="round" secondary fluid large icon>
              <Icon kind="metamask" />
              Metamask
            </Button>
          }
        />
      )
    );
  }
}

Metamask.propTypes = {
  createKeystore: PropTypes.func,
};

Metamask.defaultProps = {
  createKeystore: undefined,
};
export default Metamask;
