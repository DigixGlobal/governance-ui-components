import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AbortButton from '../abort';
import FinalizeButton from '../finalize';
import ClaimApprovalButton from '../claim-approval';
import ClaimResultsButton from '../claim-results';
import MilestoneCompletedButton from '../milestone-completed';
import ClaimFundingButton from '../claim-funding';

class ParticantButtons extends React.Component {
  render() {
    const {
      isProposer,
      proposal: { data },
      history,
    } = this.props;
    return (
      <Fragment>
        <AbortButton
          stage={data.stage}
          isProposer={isProposer}
          proposalId={data.proposalId}
          finalVersionIpfsDoc={data.finalVersionIpfsDoc}
          history={history}
        />
        <FinalizeButton
          endorser={data.endorser}
          stage={data.stage}
          isProposer={isProposer}
          proposalId={data.proposalId}
          finalVersionIpfsDoc={data.finalVersionIpfsDoc}
          history={history}
          timeCreated={data.timeCreated}
        />
        <ClaimApprovalButton
          isProposer={isProposer}
          draftVoting={data.draftVoting}
          history={history}
          votingStage={data.votingStage}
          proposalId={data.proposalId}
        />
        <ClaimResultsButton isProposer={isProposer} proposal={data} history={history} />
        <ClaimFundingButton isProposer={isProposer} proposal={data} history={history} />
        <MilestoneCompletedButton isProposer={isProposer} proposal={data} history={history} />
      </Fragment>
    );
  }
}

const { object, bool } = PropTypes;

ParticantButtons.propTypes = {
  proposal: object.isRequired,
  isProposer: bool.isRequired,
  // web3Redux: object.isRequired,
  // ChallengeProof: object.isRequired,
  // showHideAlert: func.isRequired,
  // sendTransactionToDaoServer: func.isRequired,
  // showTxSigningModal: func.isRequired,
  // addresses: array.isRequired,
  history: object.isRequired,
};
