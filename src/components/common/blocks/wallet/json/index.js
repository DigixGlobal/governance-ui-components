import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import ImportKeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/import_keystore_modal';

import { WalletItem } from '../style';
import Button from '../../../../common/elements/buttons/index';
import Icon from '../../../../common/elements/icons';

class V3Keystore extends React.Component {
  render() {
    return (
      (
        <DefaultAddressSelector
          inverted
          key="v3-keystore"
          renderBottom={false}
          name="from"
          keystoreType="v3"
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <ImportKeystoreModal
          createKeystore={this.props.createKeystore}
          key="v3-popup"
          submitFunc={this.props.createKeystore}
          header="Import Wallet"
          skipConfirmation
          onCancel={() => console.log('cancelled')}
          onClose={() => console.log('closing')}
          updateDefaultAddress
          trigger={
            <WalletItem>
              <Button fullWidth>
                <Icon kind="json" />
                Json File
              </Button>
            </WalletItem>
          }
        />
      )
    );
  }
}

V3Keystore.propTypes = {
  createKeystore: PropTypes.func,
};

V3Keystore.defaultProps = {
  createKeystore: undefined,
};
export default V3Keystore;
