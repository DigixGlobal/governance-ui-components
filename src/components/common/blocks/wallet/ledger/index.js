import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DefaultAddressSelector from 'spectrum-lightsuite/src/libs/material-ui/components/common/default_address_selector';
import KeystoreModal from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_modal';
import KeystoreCreationForm from 'spectrum-lightsuite/src/libs/material-ui/components/keystores/keystore_creation_form';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';

class Ledger extends React.Component {
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
    if (blockList.includes('LEDGER')) {
      this.setState({
        blocked: true,
      });
    }
  };

  render() {
    const { blocked } = this.state;
    return (
      (
        <DefaultAddressSelector
          inverted
          key="addressSelector"
          renderBottom={false}
          name="from"
          keystoreType="ledger"
          renderNoAccounts={() => null}
          showAddressOnly
        />
      ),
      (
        <div style={blocked ? { pointerEvents: 'none' } : null}>
          <KeystoreModal
            createKeystore={this.props.createKeystore}
            onSuccess={() => this.props.onSuccess()}
            showBalances
            key="keystore-popup"
            submitFunc={this.props.createKeystore}
            form={KeystoreCreationForm}
            creatingKeyStore
            data={{ type: 'ledger', updateDefaultAddress: true }}
            header="Load Ledger Wallet"
            hideSelector
            allowedKeystoreTypes={['ledger']}
            translations={this.props.translations}
            commonTranslations={this.props.commonTranslations}
            logLoadWallet={LogLoadWallet}
            trigger={
              <Button kind="round" secondary large showIcon fluid disabled={blocked}>
                <Icon kind="ledger" />
                Ledger
              </Button>
            }
          />
        </div>
      )
    );
  }
}

const { func, object, array } = PropTypes;

Ledger.propTypes = {
  commonTranslations: object.isRequired,
  createKeystore: func,
  onSuccess: func.isRequired,
  translations: object.isRequired,
  blockList: array.isRequired,
};

Ledger.defaultProps = {
  createKeystore: undefined,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data.loadWallet.Ledger,
  commonTranslations: state.daoServer.Translations.data.loadWallet.common,
});

export default connect(mapStateToProps)(Ledger);
