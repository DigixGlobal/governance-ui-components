import React from 'react';
import styled from 'styled-components';

const HR = styled.hr`
  border: none;
  border-top: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  margin: 3rem 0;
`;

export default class HorizontalBar extends React.Component {
  render() {
    return (
      <div>
        <HR />
      </div>
    );
  }
}
