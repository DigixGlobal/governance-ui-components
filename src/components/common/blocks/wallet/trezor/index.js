import Button from '@digix/gov-ui/components/common/elements/buttons/';
import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import PropTypes from 'prop-types';
import React from 'react';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { getLoadWalletTranslation } from '@digix/gov-ui/utils/helpers';

class Trezor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocked: false,
    };
  }

  componentDidMount = () => {
    this.getBlockList();
  };

  getBlockList = () => {
    const { blockList } = this.props;
    if (blockList.includes('TREZOR')) {
      this.setState({
        blocked: true,
      });
    }
  };

  render() {
    const { blocked } = this.state;
    const loadWalletTrans = getLoadWalletTranslation();
    const tCommon = loadWalletTrans.common;
    const tTrezor = loadWalletTrans.Trezor;

    return (
      (
        <DefaultAddressSelector
          inverted
          key="trezor-address-selector"
          keystoreType="trezor"
          name="from"
          renderBottom={false}
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <div style={blocked ? { pointerEvents: 'none' } : null}>
          <KeystoreModal
            allowedKeystoreTypes={['trezor']}
            commonTranslations={tCommon}
            createKeystore={this.props.createKeystore}
            creatingKeyStore
            data={{ type: 'trezor', updateDefaultAddress: true }}
            form={KeystoreCreationForm}
            key="trezor-popup"
            header="Load Trezor Wallet"
            hideSelector
            logLoadWallet={LogLoadWallet}
            onSuccess={() => this.props.onSuccess()}
            showBalances
            submitFunc={this.props.createKeystore}
            translations={tTrezor}
            trigger={
              <Button
                disabled={blocked}
                fluid
                kind="round"
                large
                secondary
                showIcon
              >
                <Icon kind="trezor" />
                Trezor
              </Button>
            }
          />
        </div>
      )
    );
  }
}

const { func, array } = PropTypes;

Trezor.propTypes = {
  createKeystore: func,
  onSuccess: func.isRequired,
  blockList: array.isRequired,
};

Trezor.defaultProps = {
  createKeystore: undefined,
};

export default Trezor;
