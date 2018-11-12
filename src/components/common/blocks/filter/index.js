import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Category from './category';
import Icon from '../../elements/icons/Plus';

import { Button, Select } from '../../index';

import { Heading, FilterWrapper, Filter, Pulldown } from './style';
import { H1 } from '../../common-styles';

export default class ProposalCardFilter extends React.Component {
  handleChange = e => {
    const { onOrderChange } = this.props;
    if (onOrderChange) onOrderChange(e.target.value);
  };
  render() {
    const { addressDetails } = this.props;
    const canCreate = addressDetails && addressDetails.data.isParticipant;
    return (
      <FilterWrapper>
        <Heading>
          <div>
            <H1>Projects</H1>
          </div>
          {/* {canCreate && ( */}
          <div>
            <Link to="/proposals/create" href="/proposals/create">
              <Button primary ghost iconButton>
                <Icon kind="plus" />
                Create
              </Button>
            </Link>
          </div>
          {/* )} */}
        </Heading>
        <Filter>
          <Category {...this.props} />
          <Pulldown>
            <Select
              small
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

const { func, object } = PropTypes;

ProposalCardFilter.propTypes = {
  onOrderChange: func.isRequired,
  addressDetails: object.isRequired,
};
