import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';

class ImToken extends React.Component {
  render() {
    return (
      (
        <DefaultAddressSelector
          inverted
          key="imtoken-address-selector"
          renderBottom={false}
          name="from"
          keystoreType="imtoken"
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <KeystoreModal
          createKeystore={this.createKeystore}
          onSuccess={() => this.props.onSuccess()}
          key="imtoken-popup"
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          creatingKeyStore
          data={{ type: 'imtoken', updateDefaultAddress: true }}
          header="Load ImToken Wallet"
          hideSelector
          allowedKeystoreTypes={['imtoken']}
          trigger={
            <Button kind="round" secondary large fluid showIcon>
              <Icon kind="imtoken" />
              ImToken
            </Button>
          }
        />
      )
    );
  }
}

const { func } = PropTypes;

ImToken.propTypes = {
  createKeystore: func,
  onSuccess: func.isRequired,
};

ImToken.defaultProps = {
  createKeystore: undefined,
};
export default ImToken;
