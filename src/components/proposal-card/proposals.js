import React from 'react';
// import PropTypes from 'prop-types';
import H2 from '../common/common-styles';
import Button from '../common/elements/buttons/index';

import {
  ProposaDetaillWrapper,
  ProposalDetail,
  TagsContainer,
  Description,
  PostedBy,
} from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <ProposaDetaillWrapper>
        <ProposalDetail>
          <TagsContainer>
            <Button kind="tag" uppercase href="/#">
              IDEA
            </Button>
          </TagsContainer>
          <Description>
            <H2>DGD holders offline meetup in Seattle</H2>
            <p>
              Lorem ipsum dolor sit amet, quis maiorum sit at, solum assum ex usu. Tation gloriatur
              ea mea. At saepe everti constituam sit, libris epicurei te eum, summo ocurreret te
              vim. Ei vim postulant rationibus.
            </p>
            <p>
              <a href=".">View Project</a>
            </p>
          </Description>
          <PostedBy>BY DGX TO THE MOON</PostedBy>
        </ProposalDetail>
      </ProposaDetaillWrapper>
    );
  }
}
