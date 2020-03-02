import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import { ActionContainer } from '@digix/gov-ui/components/common/blocks/wallet/style.js';
import { WalletStages } from '@digix/gov-ui/constants';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';
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
    const { onClose, translations } = this.props;

    if (!translations) {
      return null;
    }

    const t = translations.dissolution;

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header>{t.LoadWallet.title}</Header>
        <p>{t.LoadWallet.unlock}</p>
        <p>{t.LoadWallet.nonParticipant}</p>
        <ReactMarkdown escapeHtml={false} source={t.Modal.ethRecommendation} />
        <ActionContainer>
          <Button kind="round" secondary fluid large onClick={this.handleButtonClick}>
            {t.LoadWallet.button}
          </Button>
        </ActionContainer>
      </IntroContainer>
    );
  }
}

const { func, object } = PropTypes;

Intro.propTypes = {
  onChangeStage: func.isRequired,
  onClose: func.isRequired,
  translations: object.isRequired,
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data,
});

export default connect(mapStateToProps)(Intro);
