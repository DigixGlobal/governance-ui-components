import React from 'react';
import PropTypes from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import ProjectDetails from '@digix/gov-ui/pages/proposals/details';
import Milestones from '@digix/gov-ui/pages/proposals/milestones';
import { Button } from '@digix/gov-ui/components/common/elements/index';

import { renderDisplayName } from '@digix/gov-ui/api/graphql-queries/users';

import {
  ProposalsWrapper,
  ProjectSummary,
  Header,
  Title,
  FundingInfo,
  InfoItem,
  ItemTitle,
  Data,
} from '@digix/gov-ui/pages/proposals/style';

const getTotalFunds = source =>
  source.reduce((acc, currentValue) => Number(acc) + Number(currentValue.fund), 0);

class Preview extends React.Component {
  render() {
    const { form, onContinueEditing, translations } = this.props;
    const { common, project } = translations;
    if (!form) {
      return null;
    }

    const milestoneFunds = (acc, currentValue) => {
      acc.push(Number(currentValue.fund));
      return acc;
    };
    const milestoneFundings = form.milestones ? form.milestones.reduce(milestoneFunds, []) : [];

    const totalFunding = form.milestones ? getTotalFunds(form.milestones) : 0;
    const funding = truncateNumber(totalFunding);
    const reward = truncateNumber(form.finalReward);

    return (
      <ProposalsWrapper>
        <Button primary onClick={onContinueEditing} data-digix="Preview-Continue">
          Continue Editing
        </Button>
        <ProjectSummary>
          <Header>
            <div>
              <Button kind="tag" showIcon>
                {common.projectStatus.idea}
              </Button>
              <Title primary data-digix="Proposal-Title">
                {form.title}
              </Title>
            </div>
          </Header>
          <FundingInfo>
            <InfoItem column>
              <ItemTitle>{project.submittedBy}</ItemTitle>
              <Data>
                <span>{renderDisplayName('Sidebar-DisplayName')}</span>
              </Data>
            </InfoItem>

            <InfoItem outlined>
              <ItemTitle>{project.milestones}</ItemTitle>
              <Data>
                <span data-digix="milestone-label">
                  {form.milestones ? form.milestones.length : 0}
                </span>
              </Data>
            </InfoItem>

            <InfoItem outlined>
              <ItemTitle>{project.funding}</ItemTitle>
              <Data>
                <div className="milestones">
                  <span data-digix="funding-amount-label">{funding}</span>
                  {` ETH `} <span className="label">{project.milestones}</span>
                </div>
                <div className="reward">
                  <span data-digix="reward-amount-label">{reward} </span>
                  ETH{` `}
                  <span className="label">{project.reward}</span>
                </div>
              </Data>
            </InfoItem>
          </FundingInfo>
        </ProjectSummary>

        <ProjectDetails project={form} preview translations={translations} />

        <Milestones
          preview
          milestones={form.milestones || []}
          fundingChanged={false}
          milestoneFundings={milestoneFundings}
          translations={translations}
        />
      </ProposalsWrapper>
    );
  }
}

const { object, func } = PropTypes;

Preview.propTypes = {
  form: object.isRequired,
  onContinueEditing: func.isRequired,
  translations: object.isRequired,
};

export default Preview;
