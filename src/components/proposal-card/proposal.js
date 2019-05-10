/* eslint-disable prettier/prettier */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LikeButton from '@digix/gov-ui/components/common/elements/like';
import LogDashboard from '@digix/gov-ui/analytics/dashboard';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { getUserStatus } from '@digix/gov-ui/utils/helpers';
import { UserStatus } from '@digix/gov-ui/constants';
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
    const { proposalId, proposalVersions } = details;

    const proposalVersion =
      proposalVersions && proposalVersions.length
        ? proposalVersions[proposalVersions.length - 1]
        : undefined;

    const canLike = AddressDetails.data && AddressDetails.data.address;
    const {
      data: {
        dashboard: { ProposalCard: cardTranslation },
        project: { status },
      },
    } = translations;

    return (
      <Details first>
        <AboutProposal>
          <Tags>
            <div>
              {/* TODO: 'actionable' prop makes the tag button green which indicates an action is required. 
            Without this prop, tag button displays red. */}
              <Button kind="tag" actionable data-digix="Proposal-Status">
                {status[details.stage.toLowerCase()]}
              </Button>
              <Button
                kind="tag"
                outline
                actionable
                data-digix="Proposal-Status"
              >
                {/* TODO: Should only show the Icon component when 'actionable' prop ^ is present. */}
                <Icon kind="flag" />
                Actionable Status On Green
              </Button>
            </div>

            <div>
              <LikeButton
                kind="text"
                xsmall
                disabled={!canLike}
                hasVoted={isLiked}
                likes={likeCount}
                onClick={() => this.props.likeProposal(proposalId)}
                translations={cardTranslation}
              />
            </div>
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
