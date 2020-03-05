import PropTypes from 'prop-types';
import React from 'react';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Step } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { getAddresses } from 'spectrum-lightsuite/src/selectors';
import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { withTranslation } from 'react-i18next';
import { Button, Icon } from '@digix/gov-ui/components/common/elements';
import {
  showHideAlert,
  setIsBurnApproved,
} from '@digix/gov-ui/reducers/gov-ui/actions';

const {
  Content,
  Container,
  Text,
} = Step;

class ApproveStep extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  approveBurn = () => {
    // [TODO]
    this.props.setIsBurnApproved(true);
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
  web3Connect(connect(mapStateToProps, {
    showHideAlert,
    setIsBurnApproved,
    showTxSigningModal,
  })(ApproveStep))
);
