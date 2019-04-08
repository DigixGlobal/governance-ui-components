import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
          translations={this.props.translations}
          commonTranslations={this.props.commonTranslations}
          trigger={
            <Button kind="round" secondary fluid showIcon large>
              <Icon kind="trezor" />
              Trezor
            </Button>
          }
        />
      )
    );
  }
}

const { func, object } = PropTypes;

Trezor.propTypes = {
  commonTranslations: object.isRequired,
  createKeystore: func,
  onSuccess: func.isRequired,
  translations: object.isRequired,
};

Trezor.defaultProps = {
  createKeystore: undefined,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data.loadWallet.Trezor,
  commonTranslations: state.daoServer.Translations.data.loadWallet.common,
});

export default connect(mapStateToProps)(Trezor);
