import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../elements/buttons/index'; // '../../elements/buttons';
import Icon from '../../../elements/icons';

import {
  IntroContainer,
  CloseButton,
  OverlayHeader as Header,
  Note,
  NoteContainer,
  StatusNote,
} from '../../../common-styles';

class Intro extends React.Component {
  handleButtonClick = () => {};
  render() {
    const { onClose } = this.props;
    return (
      <IntroContainer>
        <CloseButton>
          <Icon kind="close" onClick={onClose} />
        </CloseButton>
        <Header uppercase>Vote on Proposal (Reveal)</Header>
        <p>
          The Reveal phase is to verify the choice you made in the Commit phase . Please upload the
          JSON file that you received in the Commit phase. Your choice will then be verified and
          counted in as a vote.
        </p>
        <Note>
          <strong>
            Please note that if this step is not carried out, your vote will be voided and will not
            be counted.
          </strong>
        </Note>

        <Button kind="round" primary medium ghost fluid onClick={this.handleButtonClick}>
          Upload JSON File
        </Button>
        <NoteContainer>
          <StatusNote>
            Your vote is <span>YES</span>
          </StatusNote>
          <p>
            Your vote is only valid and counted as activity on the DigixDAO after your confirmation.
          </p>
        </NoteContainer>
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
