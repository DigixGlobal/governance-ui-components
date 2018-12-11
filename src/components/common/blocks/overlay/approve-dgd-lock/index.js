import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../elements/buttons/index'; // '../../elements/buttons';
import Icon from '../../../elements/icons';

import { IntroContainer, CloseButton, OverlayHeader as Header } from '../../../common-styles';

class Intro extends React.Component {
  handleButtonClick = () => {};
  render() {
    const { onClose } = this.props;
    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header uppercase>Enabling Your DGD For Use</Header>
        <p>
          In order to participate in DigixDAO, we need your approval in order for our contracts to
          interact with your DGD.
        </p>

        <Button kind="round" primary fill fluid onClick={this.handleButtonClick}>
          APPROVE THE INTERACTION
        </Button>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

Intro.propTypes = {
  onClose: func.isRequired,
};
export default Intro;
