import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../common/elements/buttons/index'; // '../../elements/buttons';
import { A } from '../../common-styles';
import Icon from '../../../common/elements/Icons';

import { IntroContainer, Header, CloseButton } from './style';
import { Stage } from './constants';

class Intro extends React.Component {
  handleButtonClick = () => {
    const { onChangeStage } = this.props;
    if (onChangeStage) {
      onChangeStage(Stage.LoadingWallet);
    }
  };
  render() {
    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" />
        </CloseButton>
        <Header>Hello there!</Header>
        <p>
          You will need to load a wallet and lock some DGD in before you can browse projects and
          vote in DigixDAO
        </p>
        <Button fullWidth onClick={this.handleButtonClick}>
          load wallet
        </Button>

        <p>
          <A href="#" secondary>
            Don't have a wallet?
          </A>
        </p>
      </IntroContainer>
    );
  }
}

Intro.propTypes = {
  onChangeStage: PropTypes.func.isRequired,
};
export default Intro;
