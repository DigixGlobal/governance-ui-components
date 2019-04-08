import React from 'react';
import PropTypes from 'prop-types';
import StyledSelect from '@digix/gov-ui/components/common/elements/select/style';

class Select extends React.Component {
  render() {
    const { items, id, showPlaceholder, ...rest } = this.props;
    return (
      <StyledSelect id={id} {...rest}>
        {showPlaceholder && (
          <option disabled value="">
            Please select option
          </option>
        )}
        {items.map((item, i) => (
          <option key={`${item.value}-${i + 1}`} value={item.value}>
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
