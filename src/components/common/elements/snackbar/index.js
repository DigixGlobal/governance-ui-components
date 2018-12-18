import React from 'react';
import { SnackbarContainer, SnackbarDesc, SnackbarAction } from './style';

class Snackbar extends React.Component {
  render() {
    return (
      <SnackbarContainer>
        <SnackbarDesc>Monkeys are now bringing your vote to the Ethereum tree</SnackbarDesc>
        <SnackbarAction>SEE IT HAPPEN FIRST HAND!</SnackbarAction>
      </SnackbarContainer>
    );
  }
}

export default Snackbar;
