import React from 'react';
import PropTypes from 'prop-types';

import Category from './category';
import StyledSelect from '../../elements/select/index';

import { Heading, FilterWrapper, Filter, Pulldown } from './style';

export default class ProposalCardFilter extends React.Component {
  handleChange = e => {
    const { onOrderChange } = this.props;
    if (onOrderChange) onOrderChange(e.target.value);
  };
  render() {
    return (
      <FilterWrapper>
        <Heading>
          <h1>Projects</h1>
        </Heading>
        <Filter>
          <Category {...this.props} />
          <Pulldown>
            <StyledSelect
              id="test"
              items={[{ text: 'Latest', value: 'latest' }, { text: 'Oldest', value: 'oldest' }]}
              onChange={this.handleChange}
            />
          </Pulldown>
        </Filter>
      </FilterWrapper>
    );
  }
}

const { func } = PropTypes;

ProposalCardFilter.propTypes = {
  onOrderChange: func.isRequired,
};
