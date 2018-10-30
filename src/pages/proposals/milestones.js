import React from 'react';
import Accordion from '../../components/common/elements/accordion/index';
import { MilestonesContainer, SubTitle } from './style';

export default class Milestones extends React.Component {
  render() {
    return (
      <MilestonesContainer>
        <SubTitle>Milestones</SubTitle>
        <Accordion />
      </MilestonesContainer>
    );
  }
}
