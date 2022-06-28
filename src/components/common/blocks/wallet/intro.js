import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import PropTypes from 'prop-types';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ActionContainer } from '@digix/gov-ui/components/common/blocks/wallet/style.js';
import { WalletStages } from '@digix/gov-ui/constants';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
import { withTranslation } from 'react-i18next';
import {
  CloseButton,
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

class Intro extends React.Component {
  handleButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      LogLoadWallet.proceedToSelection();
      onChangeStage(WalletStages.LoadingWallet);
    }
  };

  render() {
    const {
      currentStage,
      onClose,
      t,
    } = this.props;

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header>
          {t('LoadWallet.title')}
        </Header>
        <p>{t('LoadWallet.unlock')}</p>
        <p>{t('LoadWallet.nonParticipant')}</p>
        <ReactMarkdown
          escapeHtml={false}
          source={t('Modal.ethRecommendation')}
        />
        {currentStage === WalletStages.Intro && (
          <ActionContainer>
            <Button
              fluid
              kind="round"
              large
              onClick={this.handleButtonClick}
              secondary
            >
              {t('LoadWallet.button')}
            </Button>
          </ActionContainer>
        )}
      </IntroContainer>
    );
  }
}

const { func, number } = PropTypes;
Intro.propTypes = {
  currentStage: number.isRequired,
  onChangeStage: func.isRequired,
  onClose: func.isRequired,
  t: func.isRequired,
};

export default withTranslation('Dissolution')(Intro);
