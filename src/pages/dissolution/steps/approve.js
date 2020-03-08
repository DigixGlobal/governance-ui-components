import Acid from '@digix/acid-contracts/build/contracts/Acid.json';
import DaoStakeLocking from '@digix/dao-contracts/build/contracts/DaoStakeLocking.json';
import PropTypes from 'prop-types';
import React from 'react';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getSignTransactionTranslation } from '@digix/gov-ui/utils/helpers';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';
import { withTranslation } from 'react-i18next';
import { Button, Icon } from '@digix/gov-ui/components/common/elements';
import {
  fetchApproval,
  withApolloClient,
} from '@digix/gov-ui/pages/dissolution/api/queries';
import getContract, { getDGDBalanceContract } from '@digix/gov-ui/utils/contracts';
import {
  showHideAlert,
  setIsBurnApproved,
} from '@digix/gov-ui/reducers/gov-ui/actions';

const {
  Content,
  Container,
  Text,
} = Step;

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class ApproveStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    this.props.client.query({
      query: fetchApproval,
      variables: {
        id: '16952', // [TODO]: replace with approval id
      },
    })
      .then((response) => {
        console.log('Fetched APPROVAL');
        console.log(response);

        if (response.data.approval) {
          this.props.setIsBurnApproved(true);
        }
      });
  }

  approveBurn = () => {
    const { addresses, t, web3Redux } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const { abi, address } = getContract(Acid, network);
    const { address: daoStakeLockingAddress } = getContract(DaoStakeLocking, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const ui = {
      caption: t('snackbars.dissolutionApprove.title'),
      header: 'User',
      type: 'txVisualization',
    };

    const web3Params = {
      gasPrice: DEFAULT_GAS_PRICE,
      gas: 1000000,
      ui,
    };

    const onTransactionAttempt = (txHash) => {
      localStorage.setItem('DissolutionApprovalTxHash', txHash);
      console.log('Attempting Approve Contract Interaction with txHash', txHash);
      this.props.showHideAlert({
        message: t('snackbars.dissolutionApprove.message'),
        status: 'pending',
        txHash,
      });
    };

    // [TODO] call when confirmed on the blockchain
    const onTransactionSuccess = (txHash) => {
      this.props.setIsBurnApproved(true);
      this.props.showHideAlert({
        message: t('snackbars.dissolutionApprove.success'),
        status: 'success',
        statusMessage: t('status.success'),
        txHash,
      });
    };

    const onFailure = (error) => {
      const message = JSON.stringify(error && error.message) || error;
      this.props.showHideAlert({
        message: `${t('snackbars.dissolutionApprove.fail')}: ${message}`,
        status: 'error',
        statusMessage: t('status.error'),
      });
    };

    const txnTranslations = getSignTransactionTranslation();
    const payload = {
      address: sourceAddress,
      contract,
      func: contract.approve,
      network,
      onFailure,
      onFinally: txHash => onTransactionAttempt(txHash),
      onSuccess: txHash => onTransactionSuccess(txHash),
      params: [daoStakeLockingAddress, toBigNumber(2 ** 255)],
      showTxSigningModal: this.props.showTxSigningModal,
      translations: txnTranslations,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  }

  render() {
    const { isBurnApproved, t } = this.props;

    const isButtonEnabled = !isBurnApproved;
    const buttonLabel = isButtonEnabled
      ? t('Dissolution:Approve.button')
      : <Icon kind="check" />;

    return (
      <Container>
        <Content>
          <Text>{t('Dissolution:Approve.instructions')}</Text>
        </Content>
        <Button
          disabled={!isButtonEnabled}
          onClick={() => this.approveBurn()}
          secondary
        >
          {buttonLabel}
        </Button>
      </Container>
    );
  }
}

const {
  array,
  bool,
  func,
  object,
} = PropTypes;

ApproveStep.propTypes = {
  addresses: array,
  client: object.isRequired,
  isBurnApproved: bool.isRequired,
  showHideAlert: func.isRequired,
  setIsBurnApproved: func.isRequired,
  showTxSigningModal: func.isRequired,
  t: func.isRequired,
  web3Redux: object.isRequired,
};

ApproveStep.defaultProps = {
  addresses: [],
};

const mapStateToProps = state => ({
  addresses: getAddresses(state),
  isBurnApproved: state.govUI.Dissolution.isBurnApproved,
});

export default withTranslation(['Snackbar', 'Dissolution'])(
  withApolloClient(
    web3Connect(connect(mapStateToProps, {
      showHideAlert,
      setIsBurnApproved,
      showTxSigningModal,
    })(ApproveStep))
  )
);
