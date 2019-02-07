import React from 'react';
import PropTypes from 'prop-types';

import StyledSelect from './style';

class Select extends React.Component {
  render() {
    const { items, id, showPlaceholder, ...rest } = this.props;
    return (
      <StyledSelect id={id} {...rest}>
        {showPlaceholder && (
          <option disabled selected value="">
            Please select option
          </option>
        )}
        {items.map(item => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </StyledSelect>
    );
  }
}

const { array, bool, string } = PropTypes;

Select.propTypes = {
  id: string.isRequired,
  items: array.isRequired,
  showPlaceholder: bool,
};

Select.defaultProps = {
  showPlaceholder: false,
};

export default Select;
