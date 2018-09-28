import React from 'react';
import PropTypes from 'prop-types';

import Container from './style';

class StyledSelect extends React.Component {
  render() {
    const { items, id } = this.props;
    return (
      <Container>
        <select id={id}>
          {items.map(item => (
            <option key={item.value} value={item.value}>
              {item.text}
            </option>
          ))}
        </select>
      </Container>
    );
  }
}

const { array, string } = PropTypes;

StyledSelect.propTypes = {
  id: string.isRequired,
  items: array.isRequired,
};
export default StyledSelect;
