import React from 'react';
// import PropTypes from 'prop-types';

import {
  MilestonesWrapper,
  Milestones,
  MilestoneStatus,
  Deadline,
  Label,
  Data,
  CallToAction,
} from './style';
import Button from '../common/elements/buttons/index';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <MilestonesWrapper>
        <Milestones>
          <MilestoneStatus>
            <Label>Milestones Completed</Label>

            <ul>
              <li />
              <li />
            </ul>
          </MilestoneStatus>
          <Deadline>
            <Label>Voting Deadline</Label>
            <Data>DD/MM/YYYY</Data>
          </Deadline>
          <CallToAction>
            <Button kind="capsule">Participate</Button>
          </CallToAction>
        </Milestones>
      </MilestonesWrapper>
    );
  }
}
