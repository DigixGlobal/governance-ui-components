import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import { WalletItem } from '../style';
import Button from '../../../../common/elements/buttons/index';
import Icon from '../../../../common/elements/icons';

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
          onClose={this.resetState}
          key="imtoken-popup"
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          creatingKeyStore
          data={{ type: 'imtoken', updateDefaultAddress: true }}
          header="Load ImToken Wallet"
          hideSelector
          allowedKeystoreTypes={['imtoken']}
          trigger={
            <WalletItem>
              <Button primary ghost fluid icon>
                <Icon kind="imtoken" />
                ImToken
              </Button>
            </WalletItem>
          }
        />
      )
    );
  }
}

ImToken.propTypes = {
  createKeystore: PropTypes.func,
};

ImToken.defaultProps = {
  createKeystore: undefined,
};
export default ImToken;
