import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@digix/gov-ui/components/common/elements/accordion/index';
import { Content, SubTitle } from '@digix/gov-ui/pages/proposals/style';

export default class Milestones extends React.Component {
  constructor(props) {
    super(props);
    this.NO_MILESTONE_DESCRIPTION = 'No milestone description has been created yet.';
  }

  renderMilestone(milestoneFunding, index) {
    const { changedFundings, fundingChanged, milestones } = this.props;
    const milestone = milestones[index];
    if (!milestone) {
      return null;
    }

    let funding;
    let milestoneFund;
    const description = milestone.description || this.NO_MILESTONE_DESCRIPTION;
    const order = index + 1;

    if (fundingChanged) {
      const { original, updated } = changedFundings[index];
      funding = Number(original);
      milestoneFund = Number(updated) - funding;
    } else {
      funding = Number(milestoneFunding);
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
    const { milestoneFundings } = this.props;
    let milestoneElements = milestoneFundings.map((milestoneFunding, i) =>
      this.renderMilestone(milestoneFunding, i)
    );
    milestoneElements = milestoneElements.filter(milestone => milestone !== null);

    return (
      <Content>
        <SubTitle>Milestones</SubTitle>
        <Accordion allowMultipleOpen>{milestoneElements}</Accordion>
      </Content>
    );
  }
}

Milestones.propTypes = {
  changedFundings: PropTypes.array,
  fundingChanged: PropTypes.bool.isRequired,
  milestoneFundings: PropTypes.array.isRequired,
  milestones: PropTypes.array.isRequired,
};

Milestones.defaultProps = {
  changedFundings: undefined,
};
