import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';

class Metamask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skipConfirmation: false,
    };
  }

  handleClick = () => {
    this.setState({ skipConfirmation: true });
  };
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
          onSuccess={() => this.props.onSuccess()}
          key="metamask-popup"
          submitFunc={this.props.createKeystore}
          form={KeystoreCreationForm}
          creatingKeyStore
          data={{ type: 'metamask', updateDefaultAddress: true }}
          keystoreType="metamask"
          header="Load MetaMask Wallet"
          skipConfirmation={this.state.skipConfirmation}
          hideSelector
          allowedKeystoreTypes={['metamask']}
          translations={this.props.translations}
          commonTranslations={this.props.commonTranslations}
          logLoadWallet={LogLoadWallet}
          trigger={
            <Button kind="round" secondary fluid large showIcon onClick={this.handleClick}>
              <Icon kind="metamask" />
              Metamask
            </Button>
          }
        />
      )
    );
  }
}

const { func, object } = PropTypes;

Metamask.propTypes = {
  commonTranslations: object.isRequired,
  createKeystore: func,
  onSuccess: func.isRequired,
  translations: object.isRequired,
};

Metamask.defaultProps = {
  createKeystore: undefined,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data.loadWallet.Metamask,
  commonTranslations: state.daoServer.Translations.data.loadWallet.common,
});

export default connect(mapStateToProps)(Metamask);
