import React from 'react';
import PropTypes from 'prop-types';

import NextVersion from '@digix/gov-ui/pages/proposals/next';
import PreviousVersion from '@digix/gov-ui/pages/proposals/previous';
import { ProposalStages } from '@digix/gov-ui/constants';
import { VersionHistory } from '@digix/gov-ui/pages/proposals/style';
import { withFetchAddress } from '@digix/gov-ui/api/graphql-queries/address';
import { withFetchProposal } from '@digix/gov-ui/api/graphql-queries/proposal';

class ProposalVersionNav extends React.Component {
  constructor(props) {
    super(props);
    this.VERSIONING_ALLOWED = [ProposalStages.idea, ProposalStages.draft];
  }

  render() {
    const {
      currentVersion,
      handlePreviousVersionClick,
      handleNextVersionClick,
      versions,
    } = this.props;

    const { stage, votingStage } = this.props.proposalDetails.data;
    const canViewProposalVersions = this.VERSIONING_ALLOWED.includes(stage) && !votingStage;
    const versionCount = versions ? versions.length : 0;

    if (versions === undefined || versions.length <= 1 || !canViewProposalVersions) {
      return null;
    }

    const disablePrevious = currentVersion === 0;
    const disableNext = currentVersion + 1 === versionCount;

    return (
      <VersionHistory data-digix="Proposal-Version-History">
        <PreviousVersion
          data-digix="Previous-Version"
          disabled={disablePrevious}
          translations={this.props.translations.project}
          onClick={handlePreviousVersionClick}
        />
        <div data-digix="Version-Count">Version {currentVersion + 1}</div>
        <NextVersion
          data-digix="Next-Version"
          disabled={disableNext}
          translations={this.props.translations.project}
          onClick={handleNextVersionClick}
        />
      </VersionHistory>
    );
  }
}

const { array, func, number, object } = PropTypes;

ProposalVersionNav.propTypes = {
  currentVersion: number.isRequired,
  handlePreviousVersionClick: func.isRequired,
  handleNextVersionClick: func.isRequired,
  proposalDetails: object.isRequired,
  versions: array.isRequired,
  translations: object.isRequired,
};

export default withFetchAddress(withFetchProposal(ProposalVersionNav));
