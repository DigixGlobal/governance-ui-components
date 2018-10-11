import React from 'react';

import Category from './category';
import StyledSelect from '../../elements/select/index';

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
          <Pulldown>
            <StyledSelect
              id="test"
              items={[{ text: 'Latest', value: '1' }, { text: 'Oldest', value: '2' }]}
            />
          </Pulldown>
        </Filter>
      </FilterWrapper>
    );
  }
}
