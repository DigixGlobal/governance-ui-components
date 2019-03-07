import React from 'react';
import PropTypes from 'prop-types';
import { truncateNumber } from '@digix/gov-ui/utils/helpers';
import Button from '@digix/gov-ui/components/common/elements/buttons/index';

import ProjectDetails from '@digix/gov-ui/pages/proposals/details';
import Milestones from '@digix/gov-ui/pages/proposals/milestones';

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
    const { form, onContinueEditing } = this.props;
    if (!form) {
      return null;
    }

    const totalFunding = form.milestones ? getTotalFunds(form.milestones) : 0;
    const funding = truncateNumber(totalFunding);
    const reward = truncateNumber(form.finalReward);

    return (
      <ProposalsWrapper>
        <Button primary onClick={onContinueEditing}>
          Continue Editing
        </Button>

        <ProjectSummary>
          <Header>
            <div>
              <Button kind="tag" showIcon>
                IDEA
              </Button>
              <Title primary>{form.title}</Title>
            </div>
          </Header>
          <FundingInfo>
            <InfoItem column>
              <ItemTitle>Submitted By</ItemTitle>
              <Data>
                <span>{renderDisplayName('Sidebar-DisplayName')}</span>
              </Data>
            </InfoItem>

            <InfoItem outlined>
              <ItemTitle>Milestones</ItemTitle>
              <Data>
                <span data-digix="milestone-label">
                  {form.milestones ? form.milestones.length : 0}
                </span>
              </Data>
            </InfoItem>

            <InfoItem outlined>
              <ItemTitle>Funding</ItemTitle>

              <Data>
                <div className="milestones">
                  <span data-digix="funding-amount-label">{funding}</span>
                  {` ETH `} <span className="label">Milestones</span>
                </div>
                <div className="reward">
                  <span data-digix="reward-amount-label">{reward} </span>
                  ETH{` `}
                  <span className="label">Reward</span>
                </div>
              </Data>
            </InfoItem>
          </FundingInfo>
        </ProjectSummary>

        <ProjectDetails project={form} preview />

        <Milestones preview milestones={form.milestones || []} fundingChanged={false} />
      </ProposalsWrapper>
    );
  }
}

const { object, func } = PropTypes;

Preview.propTypes = {
  form: object.isRequired,
  onContinueEditing: func.isRequired,
};

export default Preview;
