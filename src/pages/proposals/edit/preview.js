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
  FundingSummary,
  SummaryInfo,
  InfoItem,
  ItemTitle,
  Data,
} from '../style';

const getTotalFunds = source =>
  source.reduce((acc, currentValue) => Number(acc) + Number(currentValue.fund), 0);

class Preview extends React.Component {
  render() {
    const { form, onContinueEditing, milestoneFundings } = this.props;
    if (!form) {
      return null;
    }

    const totalFunding = form.milestones ? getTotalFunds(form.milestones) : 0;
    const funding = truncateNumber(totalFunding);
    const reward = truncateNumber(form.finalReward);

    return (
      <ProposalsWrapper>
        <Button primary ghost onClick={onContinueEditing}>
          Continue Editing
        </Button>
        <ProjectSummary>
          <Header>
            <div>
              <Button kind="flat" style={{ pointerEvents: 'none' }}>
                IDEA
              </Button>
              <Title primary>{form.title}</Title>
            </div>
          </Header>
          <FundingSummary>
            <SummaryInfo>
              <InfoItem>
                <ItemTitle>Submitted By</ItemTitle>
                <Data>
                  <span>{renderDisplayName('Sidebar-DisplayName')}</span>
                </Data>
              </InfoItem>
              <InfoItem>
                <ItemTitle>Funding</ItemTitle>
                <Data>
                  <span data-digix="funding-amount-label">{funding}</span>
                  {` ETH`}
                </Data>
              </InfoItem>
              <InfoItem>
                <ItemTitle>Milestones</ItemTitle>
                <Data>
                  <span data-digix="milestone-label">
                    {form.milestones ? form.milestones.length : 0}
                  </span>
                </Data>
              </InfoItem>
              <InfoItem>
                <ItemTitle>Reward</ItemTitle>
                <Data>
                  <span data-digix="reward-amount-label">{reward} </span>
                  ETH
                </Data>
              </InfoItem>
            </SummaryInfo>
          </FundingSummary>
        </ProjectSummary>
        <ProjectDetails project={form} preview />
        <Milestones
          preview
          milestones={form.milestones || []}
          fundingChanged={false}
          milestoneFundings={milestoneFundings}
        />
      </ProposalsWrapper>
    );
  }
}

const { object, func, array } = PropTypes;

Preview.propTypes = {
  form: object.isRequired,
  onContinueEditing: func.isRequired,
  milestoneFundings: array.isRequired,
};

export default Preview;
