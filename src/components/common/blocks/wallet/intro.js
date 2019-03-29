import React from 'react';
import PropTypes from 'prop-types';

import Button from '@digix/gov-ui/components/common/elements/buttons/';
import Icon from '@digix/gov-ui/components/common/elements/icons';
import {
  CloseButton,
  IntroContainer,
  Link,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';
import { ActionContainer } from '@digix/gov-ui/components/common/blocks/wallet/style.js';
import { WalletStages } from '@digix/gov-ui/constants';

class Intro extends React.Component {
  handleButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(WalletStages.LoadingWallet);
    }
  };

  render() {
    const { onClose } = this.props;
    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header>Hello there!</Header>
        <p>
          You will need to load a wallet and lock some DGD in before you can browse projects and
          vote in DigixDAO
        </p>
        <ActionContainer>
          <Button kind="round" secondary fluid large onClick={this.handleButtonClick}>
            Load Wallet
          </Button>
        </ActionContainer>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

Intro.propTypes = {
  onChangeStage: func.isRequired,
  onClose: func.isRequired,
};
export default Intro;
