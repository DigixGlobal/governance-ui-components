import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../elements/buttons/index'; // '../../elements/buttons';
import Icon from '../../../elements/icons';

import { IntroContainer, CloseButton, OverlayHeader as Header } from '../../../common-styles';

class Intro extends React.Component {
  handleButtonClick = () => {};
  render() {
    const { onClose } = this.props;
    const ResponseButton = props => <Button {...props} kind="round" fluid ghost primary xlarge />;

    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header uppercase>Approving Draft</Header>
        <p>
          Approval from moderators is needed in order to move a draft to the proposal stage. Please
          make your vote here if you’re in approval for the draft.
        </p>
        <ResponseButton yes>Yes</ResponseButton>
        <ResponseButton no>No</ResponseButton>
        <Button kind="round" primary fill fluid onClick={this.handleButtonClick}>
          Confirm My Vote
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
