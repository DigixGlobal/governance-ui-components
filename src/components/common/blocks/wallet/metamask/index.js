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
      blocked: false,
    };
  }

  componentDidMount = () => {
    this.getBlockList();
  };

  getBlockList = () => {
    const { blockList } = this.props;
    if (blockList.includes('METAMASK')) {
      this.setState({
        blocked: true,
      });
    }
  };

  handleClick = () => {
    this.setState({ skipConfirmation: true });
  };
  render() {
    const { blocked } = this.state;
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
        <div style={blocked ? { pointerEvents: 'none' } : null}>
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
              <Button
                kind="round"
                secondary
                fluid
                large
                showIcon
                onClick={this.handleClick}
                disabled={blocked}
              >
                <Icon kind="metamask" />
                Metamask
              </Button>
            }
          />
        </div>
      )
    );
  }
}

const { func, object, array } = PropTypes;

Metamask.propTypes = {
  commonTranslations: object.isRequired,
  createKeystore: func,
  onSuccess: func.isRequired,
  translations: object.isRequired,
  blockList: array.isRequired,
};

Metamask.defaultProps = {
  createKeystore: undefined,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data.loadWallet.Metamask,
  commonTranslations: state.daoServer.Translations.data.loadWallet.common,
});

export default connect(mapStateToProps)(Metamask);
