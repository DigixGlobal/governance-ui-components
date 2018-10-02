import React from 'react';
// import PropTypes from 'prop-types';

import { H2 } from '../common/common-styles';

import Button from '../common/buttons';

import {
  ProposalContainer,
  TagsContainer,
  ProposalDetail,
  MileStones,
  Stats,
  ProgressContainer,
  Progress,
  StatItem,
} from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <ProposalContainer>
        <ProposalDetail>
          <TagsContainer>
            <Button kind="tag" uppercase href="/#">
              finance
            </Button>
            <Button kind="tag" uppercase href="/#">
              non-profit
            </Button>
          </TagsContainer>
          <H2>DGD holders offline meetup in Seattle</H2>
          <p>
            Lorem ipsum dolor sit amet, quis maiorum sit at, solum assum ex usu. Tation gloriatur ea
            mea. At saepe everti constituam sit, libris epicurei te eum, summo ocurreret te vim. Ei
            vim postulant rationibus.
          </p>
          <MileStones />
        </ProposalDetail>
        <Stats>
          <StatItem>
            funding amount
            <span>150 eth</span>
          </StatItem>
          <StatItem>
            upvote
            <span>68%</span>
          </StatItem>
          <StatItem>
            participants
            <span>111</span>
          </StatItem>
        </Stats>
        <ProgressContainer>
          <Progress />
        </ProgressContainer>
      </ProposalContainer>
    );
  }
}
