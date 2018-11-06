import React from 'react';
import PropTypes from 'prop-types';

import Category from './category';
import StyledSelect from '../../elements/select/index';
import Button from '../../elements/buttons/index';
import Icon from '../../elements/icons/Plus';

import { Heading, FilterWrapper, Filter, Pulldown } from './style';
import { H1 } from '../../common-styles';

export default class ProposalCardFilter extends React.Component {
  handleChange = e => {
    const { onOrderChange } = this.props;
    if (onOrderChange) onOrderChange(e.target.value);
  };
  render() {
    return (
      <FilterWrapper>
        <Heading>
          <div>
            <H1>Projects</H1>
          </div>
          <div>
            <Button primary ghost>
              <Icon kind="plus" />
              Create
            </Button>
          </div>
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
