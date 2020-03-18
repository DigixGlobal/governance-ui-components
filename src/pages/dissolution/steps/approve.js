import Acid from '@digix/acid-contracts/build/contracts/Acid.json';
import DgdToken from '@digix/dao-contracts/build/contracts/MockDgd.json';
import PropTypes from 'prop-types';
import React from 'react';
import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import TxVisualization from '@digix/gov-ui/components/common/blocks/tx-visualization';
import getContract from '@digix/gov-ui/utils/contracts';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { DEFAULT_GAS_PRICE } from '@digix/gov-ui/constants';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { executeContractFunction } from '@digix/gov-ui/utils/web3Helper';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { getSignTransactionTranslation } from '@digix/gov-ui/utils/helpers';
import { registerUIs } from 'spectrum-lightsuite/src/helpers/uiRegistry';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withTranslation } from 'react-i18next';
import { Button } from '@digix/gov-ui/components/common/elements';
import {
  approveSubscription,
  fetchApproval,
  withApolloClient,
} from '@digix/gov-ui/pages/dissolution/api/queries';
import {
  showHideAlert,
  setIsBurnApproved,
} from '@digix/gov-ui/reducers/gov-ui/actions';

const {
  Content,
  Container,
  Text,
  SuccessIcon,
} = Step;

registerUIs({ txVisualization: { component: TxVisualization } });
const network = SpectrumConfig.defaultNetworks[0];

class ApproveStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTxBroadcasted: false,
    };

    this.subscription = undefined;
  }

  componentWillMount = () => {
    const {
      addresses,
      client,
    } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);
    const acidContract = getContract(Acid, network);

    client.query({
      query: fetchApproval,
      variables: {
        from: sourceAddress.address.toLowerCase(),
        to: acidContract.address.toLowerCase(),
      },
    })
      .then((response) => {
        if (response.data.approvals.length) {
          this.props.setIsBurnApproved(true);
        }
      });
  }

  approveBurn = () => {
    const {
      addresses,
      confirmMinedTx,
      setCurrentSubscription,
      t,
      web3Redux
    } = this.props;
    const sourceAddress = addresses.find(({ isDefault }) => isDefault);

    const acidContract = getContract(Acid, network);
    const { abi, address } = getContract(DgdToken, network);
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
      gas: 300000,
      ui,
    };

    const onTransactionSuccess = (txHash) => {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

      this.props.setIsBurnApproved(true);
      this.props.showHideAlert({
        message: t('snackbars.dissolutionApprove.success'),
        status: 'success',
        statusMessage: t('status.success'),
        txHash,
      });
    };

    const onFailure = (error) => {
      if (this.subscription) {
        this.setState({ isTxBroadcasted: false });
        this.subscription.unsubscribe();
        this.subscription = undefined;
      }

      const message = JSON.stringify(error && error.message) || error;
      this.props.showHideAlert({
        message: `${t('snackbars.dissolutionApprove.fail')}: ${message}`,
        status: 'error',
        statusMessage: t('status.error'),
      });
    };

    const onTransactionAttempt = (txHash) => {
      localStorage.setItem('DissolutionApprovalTxHash', txHash);
      this.setState({ isTxBroadcasted: true });

      this.props.showHideAlert({
        message: t('snackbars.dissolutionApprove.message'),
        status: 'pending',
        txHash,
      });

      confirmMinedTx(txHash, web3Redux.web3(network), onFailure);
      const subscription = this.props.client.subscribe({
        query: approveSubscription,
        variables: {
          from: sourceAddress.address.toLowerCase(),
          to: acidContract.address.toLowerCase(),
        },
      }).subscribe({
        next(response) {
          if (response.data.byAddress.length) {
            onTransactionSuccess(txHash);
          }
        },
        error(error) {
          onFailure(error);
        },
      });

      this.subscription = subscription;
      setCurrentSubscription(subscription);
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
      params: [acidContract.address, (2000000 * 1e9)],
      showTxSigningModal: this.props.showTxSigningModal,
      translations: txnTranslations,
      ui,
      web3Params,
    };

    return executeContractFunction(payload);
  }

  render() {
    const { isTxBroadcasted } = this.state;
    const { isBurnApproved, t } = this.props;

    const isButtonEnabled = !isBurnApproved;
    const buttonLabel = isButtonEnabled
      ? t('Dissolution:Approve.button')
      : <SuccessIcon kind="check" />;

    return (
      <Container>
        <Content>
          <Text>{t('Dissolution:Approve.instructions')}</Text>
        </Content>
        <Button
          disabled={isTxBroadcasted || !isButtonEnabled}
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
  confirmMinedTx: func.isRequired,
  isBurnApproved: bool.isRequired,
  showHideAlert: func.isRequired,
  setIsBurnApproved: func.isRequired,
  setCurrentSubscription: func.isRequired,
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
