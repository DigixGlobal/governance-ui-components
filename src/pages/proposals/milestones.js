import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '@digix/gov-ui/components/common/elements/accordion/index';
import { MilestonesContainer, SubTitle } from '@digix/gov-ui/pages/proposals/style';

export default class Milestones extends React.Component {
  render() {
    const { milestones, milestoneFundings, changedFundings, fundingChanged } = this.props;
    return (
      <MilestonesContainer>
        <SubTitle>Milestones</SubTitle>
        <Accordion allowMultipleOpen>
          {milestones.map((milestone, i) => {
            const funding = fundingChanged ? Number(milestoneFundings[i]) : milestoneFundings[i];
            const updatedFunding = fundingChanged ? Number(changedFundings[i].updated) : 0;
            const milestoneFund = updatedFunding - funding;

            return (
              <div
                key={`ms-${i + 1}`}
                label={`Milestone ${i + 1}: ${milestone.title || ''}`}
                funding={milestoneFundings[i]}
                milestoneFund={milestoneFund !== 0 ? milestoneFund : undefined}
              >
                {milestone.description
                  ? milestone.description
                  : 'No milestone description has been created yet.'}
              </div>
            );
          })}
        </Accordion>
      </MilestonesContainer>
    );
  }
}

Milestones.propTypes = {
  milestones: PropTypes.array.isRequired,
  milestoneFundings: PropTypes.array.isRequired,
  changedFundings: PropTypes.array.isRequired,
  fundingChanged: PropTypes.bool.isRequired,
};
