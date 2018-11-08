import React from 'react';
import PropTypes from 'prop-types';

import StyledSelect from './style';

class Select extends React.Component {
  render() {
    const { items, id, ...rest } = this.props;
    return (
      <StyledSelect id={id} {...rest}>
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </StyledSelect>
    );
  }
}

const { array, string } = PropTypes;

Select.propTypes = {
  id: string.isRequired,
  items: array.isRequired,
};
export default Select;
