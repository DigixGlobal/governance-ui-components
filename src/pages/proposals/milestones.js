import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../components/common/elements/accordion/index';
import { MilestonesContainer, SubTitle } from './style';

export default class Milestones extends React.Component {
  render() {
    const { milestones, milestoneFundings, changedFundings, preview } = this.props;
    return (
      <MilestonesContainer>
        <SubTitle>Milestones</SubTitle>
        <Accordion allowMultipleOpen>
          {milestones.map((milestone, i) => {
            const funding = Number(milestoneFundings[i]);
            const updatedFunding = changedFundings ? Number(changedFundings[i].updated) : 0;
            const milestoneFund = updatedFunding > 0 ? updatedFunding - funding : funding;
            const fundingText = milestoneFund > 0 ? `${funding} + ${milestoneFund}` : funding;
            return (
              <div key={`ms-${i + 1}`} label={`Milestone ${i + 1}: ${milestone.title || ''}`}>
                <p>Funding: {preview ? milestone.fund : fundingText} ETH</p>
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
  preview: PropTypes.bool,
};

Milestones.defaultProps = {
  preview: false,
};
