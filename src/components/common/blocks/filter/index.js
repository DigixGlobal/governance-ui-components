import React from 'react';

import Category from './category';

import { Heading, FilterWrapper, Filter, Pulldown } from './style';

export default class ProposalCard extends React.Component {
  render() {
    return (
      <FilterWrapper>
        <Heading>
          <h1>Projects</h1>
        </Heading>
        <Filter>
          <Category />
          <Pulldown>asd</Pulldown>
        </Filter>
      </FilterWrapper>
    );
  }
}
