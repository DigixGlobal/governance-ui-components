import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@digix/gov-ui/components/common/elements/accordion/index';
import { Content, SubTitle } from '@digix/gov-ui/pages/proposals/style';

export default class Milestones extends React.Component {
  constructor(props) {
    super(props);
    this.NO_MILESTONE_DESCRIPTION = 'No milestone description has been created yet.';
  }

  renderMilestone(milestone, index) {
    const { changedFundings, fundingChanged } = this.props;

    let funding;
    let milestoneFund;
    const description = milestone.description || this.NO_MILESTONE_DESCRIPTION;
    const order = index + 1;

    if (fundingChanged) {
      const { original, updated } = changedFundings[index];
      funding = Number(original);
      milestoneFund = Number(updated) - funding;
    } else {
      funding = milestone.fund;
    }

    return (
      <div
        key={`ms-${order}`}
        label={`Milestone ${order}: ${milestone.title || ''}`}
        funding={funding}
        milestoneFund={milestoneFund}
      >
        {description}
      </div>
    );
  }

  render() {
    const { milestones } = this.props;
    const milestoneElements = milestones.map((milestone, i) => this.renderMilestone(milestone, i));

    return (
      <Content>
        <SubTitle>Milestones</SubTitle>
        <Accordion allowMultipleOpen>{milestoneElements}</Accordion>
      </Content>
    );
  }
}

Milestones.propTypes = {
  changedFundings: PropTypes.array.isRequired,
  fundingChanged: PropTypes.bool.isRequired,
  milestones: PropTypes.array.isRequired,
};
