import React from 'react';
import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';

const StyledSwitch = styled(({ ...other }) => (
  <div>
    <Switch
      {...other}
      classes={{ colorSecondary: 'colorSecondary', checked: 'checked', bar: 'bar' }}
    />
  </div>
))`
  & .colorSecondary.checked + .bar {
    background-color: ${props => props.theme.lighter.toString()};
  }
  & .colorSecondary.checked {
    color: ${props => props.theme.default.toString()};
  }
`;

export default StyledSwitch;
