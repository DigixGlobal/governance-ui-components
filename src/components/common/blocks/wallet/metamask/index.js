import Button from '@digix/gov-ui/components/common/elements/buttons/';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import PropTypes from 'prop-types';
import React from 'react';
import { getLoadWalletTranslation } from '@digix/gov-ui/utils/helpers';
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
    const loadWalletTrans = getLoadWalletTranslation();
    const tCommon = loadWalletTrans.common;
    const tMetaMask = loadWalletTrans.Metamask;

    return (
      (
        <DefaultAddressSelector
          inverted
          key="metamask-address-selector"
          keystoreType="metamask"
          name="from"
          renderBottom={false}
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
            translations={tMetaMask}
            commonTranslations={tCommon}
            logLoadWallet={LogLoadWallet}
            trigger={
              <Button
                disabled={blocked}
                fluid
                kind="round"
                large
                onClick={this.handleClick}
                showIcon
                secondary
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

const { func, array } = PropTypes;

Metamask.propTypes = {
  createKeystore: func,
  onSuccess: func.isRequired,
  blockList: array.isRequired,
};

Metamask.defaultProps = {
  createKeystore: undefined,
};

export default Metamask;
