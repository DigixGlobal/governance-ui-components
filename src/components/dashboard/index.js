import React from 'react';
import PropTypes from 'prop-types';

import { DashBoardContainer, DashBoardItem, Count, Label } from './style';

class DashBoard extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <DashBoardContainer>
        {items.map(item => (
          <DashBoardItem key={item.count}>
            <Count>{item.count}</Count>
            <Label>{item.label}</Label>
          </DashBoardItem>
        ))}
      </DashBoardContainer>
    );
  }
}

DashBoard.propTypes = {
  items: PropTypes.array.isRequired,
};

export default DashBoard;
