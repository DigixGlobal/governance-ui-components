import PropTypes from 'prop-types';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { Modal } from '@digix/gov-ui/pages/dissolution/style';
import { connect } from 'react-redux';
import { showHideWalletOverlay } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withTranslation } from 'react-i18next';
import React, { Fragment } from 'react';

import Step1Dashboard from '@digix/gov-ui/assets/images/dissolution_step1_dashboard.png';
import Step2Send from '@digix/gov-ui/assets/images/dissolution_step2_send.png';
import Step2Tx from '@digix/gov-ui/assets/images/dissolution_step2_tx.png';
import Step3Send from '@digix/gov-ui/assets/images/dissolution_step3_send.png';
import Step3Tx from '@digix/gov-ui/assets/images/dissolution_step3_tx.png';
import Step3Dashboard from '@digix/gov-ui/assets/images/dissolution_step3_dashboard.png';

const {
  Container,
  Instruction,
  Title,
  Paragraph,
  Button,
  ButtonRagnarok,
  Steps,
  StepItem
} = Modal;

class DissolutionModal extends React.Component {
  openLoadWalletPanel = () => {
    LogLoadWallet.initiate();
    this.props.showHideWalletOverlay(true);
    this.props.closeModal();
  };

  render() {
    const { t } = this.props;

    return (
      <Fragment>
        <Container>
          <Title>{t('Modal.title')}</Title>
          <Paragraph
            escapeHtml={false}
            source={t('Modal.message')}
          />
          <Steps>
            <StepItem>
              <Paragraph
                escapeHtml={false}
                source={t('Modal.step0')}
              />
            </StepItem>
            <StepItem>
              <Paragraph
                escapeHtml={false}
                source={t('Modal.step1')}
              />
              <Paragraph
                escapeHtml={false}
                source={`[Dashboard](${Step1Dashboard})`}
              />
            </StepItem>
            <StepItem>
              <Paragraph
                escapeHtml={false}
                source={t('Modal.step2')}
              />
              <Paragraph
                escapeHtml={false}
                source={`[Sample Send Form](${Step2Send}) | [Sample Transaction Details](${Step2Tx})`}
              />
              <Instruction>
                {t('Modal.approveContract')} <br />
                {t('Modal.approveGasLimit')} <br />
                {t('Modal.approveTxnAmount')} <br />
                {t('Modal.approveTxnData')}
              </Instruction>
            </StepItem>
            <StepItem>
              <Paragraph
                escapeHtml={false}
                source={t('Modal.step3')}
              />
              <Paragraph
                escapeHtml={false}
                source={`[Sample Send Form](${Step3Send}) | [Sample Transaction Details](${Step3Tx}) | [Dashboard](${Step3Dashboard})`}
              />
              <Instruction>
                {t('Modal.burnContract')} <br />
                {t('Modal.burnGasLimit')} <br />
                {t('Modal.burnTxnAmount')} <br />
                {t('Modal.burnTxnData')}
              </Instruction>
            </StepItem>
          </Steps>
          <Paragraph
            escapeHtml={false}
            source={t('Modal.message2')}
          />
          <Button
            onClick={() => window.open('https://www.myetherwallet.com', '_blank')}
            primary
          >
            {t('Modal.button1')}
          </Button>
          <ButtonRagnarok
            onClick={this.openLoadWalletPanel}
          >
            {t('Modal.button2')}
          </ButtonRagnarok>
        </Container>
      </Fragment>
    );
  }
}

const { func } = PropTypes;
DissolutionModal.propTypes = {
  closeModal: func.isRequired,
  showHideWalletOverlay: func.isRequired,
  t: func.isRequired,
};

const mapStateToProps = () => ({
});

export default withTranslation('Dissolution')(connect(mapStateToProps, {
  showHideWalletOverlay
})(DissolutionModal));
