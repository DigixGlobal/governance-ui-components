import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { SpProposal } from '@digix/gov-ui/pages/style';

const { SpContainer, SpTitle, SpParagraph, SpButton } = SpProposal;

class RagnarokSpProposal extends React.Component {
  render() {
    const { closeModal } = this.props;
    return (
      <Fragment>
        <SpContainer>
          <SpTitle>RAGNAROK HAS PASSED. WHAT DOES THIS MEAN FOR YOU?</SpTitle>
          <SpParagraph>
            Now that the dissolution vote has passed, the current Quarter will be the final DigixDAO
            Quarter.
          </SpParagraph>
          <SpParagraph>
            All activities in DigixDAO will cease. As such, the creation of new projects and any
            voting on the platform will be disabled.
          </SpParagraph>
          <SpParagraph>
            All ETH in the DigixDAO Treasury (minus the 2 ETH collateral submitted by each Proposer
            per active project) from DigixDAO will reside in the DigixDAO Refund Contract before the
            end of the current Quarter. The claiming process will only be active after the end of
            current Quarter. More details and the tutorial to do that will be published closer to
            date.
          </SpParagraph>
          <SpParagraph>
            More information about Project Ragnarok can be found at&nbsp;
            <a href="https://community.digix.global/#/proposals/0xe7d5d8aefc5f73c4c8bbc716f0c3c2dd52d5282d18217db331da4435b8e6966e">
              https://community.digix.global/#/proposals/0xe7d5d8aefc5f73c4c8bbc716f0c3c2dd52d5282d18217db331da4435b8e6966e
            </a>
          </SpParagraph>
          <SpButton data-digix="TOC-READ-AGREE" onClick={closeModal} primary>
            Dismiss
          </SpButton>
        </SpContainer>
      </Fragment>
    );
  }
}

const { func } = PropTypes;
RagnarokSpProposal.propTypes = {
  closeModal: func.isRequired,
};

export default RagnarokSpProposal;
