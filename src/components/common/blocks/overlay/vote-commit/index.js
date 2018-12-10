import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../elements/buttons/index'; // '../../elements/buttons';
import Icon from '../../../elements/icons';

import { IntroContainer, CloseButton, OverlayHeader as Header, Note } from '../../../common-styles';

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
        <Header uppercase>Vote on Proposal (Commit)</Header>
        <p>
          In the DigixDAO, we employ the Commit and Reveal scheme to keep your votes as unbiased as
          possible. You will need to download a JSON file when deciding your choice in the vote.
          Your choice will then be verified in the Reveal phase when you upload the same JSON file.
        </p>
        <Note>
          <strong>
            Please keep the file in a safe place as you will not be able to download it again.
          </strong>
        </Note>
        <ResponseButton yes>Yes</ResponseButton>
        <ResponseButton no>No</ResponseButton>
        <Button kind="round" primary medium ghost fluid onClick={this.handleButtonClick}>
          Download JSON File
        </Button>
        <Button kind="round" secondary success fluid onClick={this.handleButtonClick}>
          File Downloaded
        </Button>
        <Button kind="round" primary fill fluid onClick={this.handleButtonClick}>
          Confirm Commit
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
