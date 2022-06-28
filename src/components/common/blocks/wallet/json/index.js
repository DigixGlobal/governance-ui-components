import Button from '@digix/gov-ui/components/common/elements/buttons/';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import ImportKeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/import_keystore_modal';
import PropTypes from 'prop-types';
import React from 'react';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { getLoadWalletTranslation } from '@digix/gov-ui/utils/helpers';

class V3Keystore extends React.Component {
  render() {
    const loadWalletTrans = getLoadWalletTranslation();
    const tCommon = loadWalletTrans.common;
    const tJson = loadWalletTrans.Json;

    return (
      (
        <DefaultAddressSelector
          inverted
          key="v3-keystore"
          keystoreType="v3"
          name="from"
          renderBottom={false}
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <ImportKeystoreModal
          commonTranslations={tCommon}
          createKeystore={this.props.createKeystore}
          header="Import Wallet"
          key="v3-popup"
          logLoadWallet={LogLoadWallet}
          onSuccess={() => this.props.onSuccess()}
          skipConfirmation
          submitFunc={this.props.createKeystore}
          translations={tJson}
          updateDefaultAddress
          trigger={
            <Button
              fluid
              kind="round"
              large
              secondary
              showIcon
            >
              <Icon kind="json" />
              Json File
            </Button>
          }
        />
      )
    );
  }
}

const { func } = PropTypes;

V3Keystore.propTypes = {
  createKeystore: func,
  onSuccess: func.isRequired,
};

V3Keystore.defaultProps = {
  createKeystore: undefined,
};

export default V3Keystore;
