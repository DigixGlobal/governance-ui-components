import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import {
  CloseButton,
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';
import { ActionContainer } from '@digix/gov-ui/components/common/blocks/wallet/style.js';
import { WalletStages } from '@digix/gov-ui/constants';
import { LogLoadWallet } from '@digix/gov-ui/analytics/loadWallet';

class Intro extends React.Component {
  handleButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      LogLoadWallet.proceedToSelection();
      onChangeStage(WalletStages.LoadingWallet);
    }
  };

  render() {
    const { onClose } = this.props;
    const t = this.props.translations.loadWallet.introOverlay;

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header>{t.title}</Header>
        <p>{t.instructions}</p>
        <ActionContainer>
          <Button kind="round" secondary fluid large onClick={this.handleButtonClick}>
            {t.button}
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
  translations: object,
};

Intro.defaultProps = {
  translations: {
    loadWallet: {
      introOverlay: {
        title: 'Hello there!',
        instructions:
          'You will need to load a wallet and lock some DGD in before you can browse projects and vote in DigixDAO.',
        button: 'Load Wallet',
      },
    },
  },
};

const mapStateToProps = state => ({
  translations: state.daoServer.Translations.data,
});

export default connect(mapStateToProps)(Intro);
