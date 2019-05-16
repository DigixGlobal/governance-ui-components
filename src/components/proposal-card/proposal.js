/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LikeButton from '@digix/gov-ui/components/common/elements/like';
import LogDashboard from '@digix/gov-ui/analytics/dashboard';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';
import { ProjectActionableStatus, UserStatus } from '@digix/gov-ui/constants';
import {
  Details,
  AboutProposal,
  Tags,
  Title,
  ShortDescr,
  Author,
  ViewCta,
} from '@digix/gov-ui/components/proposal-card/style';

class Proposal extends React.PureComponent {
  redirectToProposalPage = () => {
    const { AddressDetails, details, history } = this.props;
    const userType = getUserStatus(AddressDetails.data, UserStatus);

    LogDashboard.viewProject(userType);
    history.push(`/proposals/${details.proposalId}`);
  };

  render() {
    const {
      AddressDetails,
      details,
      displayName,
      isLiked,
      likeCount,
      title,
      translations,
    } = this.props;
    const { actionableStatus, isSpecial, proposalId, proposalVersions } = details;

    const proposalVersion =
      proposalVersions && proposalVersions.length
        ? proposalVersions[proposalVersions.length - 1]
        : undefined;

    const canLike = AddressDetails.data && AddressDetails.data.address;
    const isActionable = actionableStatus !== ProjectActionableStatus.NONE;
    const tActionable = translations.data.project.actionableStatus;
    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        project: { special, status },
      },
    } = translations;

    return (
      <Details first>
        <AboutProposal>
          <Tags>
            <div>
              {isSpecial && (
                <Button kind="tag" special  data-digix="Proposal-IsSpecial">
                  {special}
                </Button>
              )}
              <Button kind="tag" actionable={isActionable} data-digix="Proposal-Status">
                {status[details.stage.toLowerCase()]}
              </Button>
              {isActionable && (
                <Button
                  kind="tag"
                  outline
                  actionable
                  data-digix="Proposal-ActionableStatus"
                >
                  <Icon kind="flag" />
                  {tActionable[actionableStatus]}
                </Button>
              )}
            </div>
            <LikeButton
              kind="text"
              xsmall
              disabled={!canLike}
              hasVoted={isLiked}
              likes={likeCount}
              onClick={() => this.props.likeProposal(proposalId)}
              translations={cardTranslation}
            />
          </Tags>
          <Title data-digix="Proposal-Title">
            {proposalVersion ? proposalVersion.dijixObject.title : title}
          </Title>
          <Author>
            {cardTranslation.by}{' '}
            <span data-digix="Proposal-Author">{displayName}</span>
          </Author>

          <ShortDescr>
            <p data-digix="Proposal-Short-Desc">
              {proposalVersion ? proposalVersion.dijixObject.description : ''}
            </p>
          </ShortDescr>

          <ViewCta
            small
            reverse
            role="link"
            onClick={this.redirectToProposalPage}
            data-digix="Participate-Btn"
          >
            {cardTranslation.view}
          </ViewCta>
        </AboutProposal>
      </Details>
    );
  }
}

const { bool, func, object, oneOfType,number, string } = PropTypes;
Proposal.propTypes = {
  AddressDetails: object,
  details: object.isRequired,
  isLiked: bool.isRequired,
  likeCount: number.isRequired,
  likeProposal: func.isRequired,
  title: string,
  history: object.isRequired,
  displayName: oneOfType([object, string]),
  translations: object.isRequired,
};

const mapStateToProps = state => ({
  AddressDetails: state.infoServer.AddressDetails,
  ChallengeProof: state.daoServer.ChallengeProof,
  userProposalLike: state.daoServer.UserProposalLike,
});

Proposal.defaultProps = {
  AddressDetails: {
    data: undefined,
  },
  displayName: '',
  title: '',
};

export default connect(
  mapStateToProps,
  {},
)(Proposal);
