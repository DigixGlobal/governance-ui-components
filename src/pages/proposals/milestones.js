import React from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../components/common/elements/accordion/index';
import { MilestonesContainer, SubTitle } from './style';

export default class Milestones extends React.Component {
  render() {
    const { milestones } = this.props;
    return (
      <MilestonesContainer>
        <SubTitle>Milestones</SubTitle>
        <Accordion allowMultipleOpen>
          {milestones.map((milestone, i) => (
            <div key={`ms-${i + 1}`} label={`Milestone ${i + 1}: ${milestone.title || ''}`}>
              {milestone.description
                ? milestone.description
                : 'No mileston description has been created yet.'}
            </div>
          ))}
        </Accordion>
      </MilestonesContainer>
    );
  }
}

Milestones.propTypes = {
  milestones: PropTypes.array.isRequired,
};
