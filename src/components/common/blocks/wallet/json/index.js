import React from 'react';
import PropTypes from 'prop-types';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import ImportKeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/import_keystore_modal';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';

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
          onClose={() => this.props.onClose()}
          updateDefaultAddress
          trigger={
            <Button kind="round" secondary large icon fluid>
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
  onClose: func.isRequired,
};

V3Keystore.defaultProps = {
  createKeystore: undefined,
};
export default V3Keystore;
