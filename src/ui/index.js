import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import Header from '../components/common/blocks/header';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

import LeftMenu from '../components/common/collapsible-menu';
import Button from '../components/common/buttons';
import Input from '../components/common/textfield';
import StyledSwitch from '../components/common/switch';
import StyledSelect from '../components/common/select';

import lightTheme from '../theme/light';

class App extends Component {
  render() {
    console.log(lightTheme.secondary);
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <Header>Create Proposal | Wallet</Header>
          <LeftMenu />
          <div
            style={{
              width: '25%',
              margin: '10px',
              padding: '20px',
              float: 'left',
            }}
          >
            <Button primary>create proposal</Button>
            &nbsp;
            <Button secondary>PARTICIPATE</Button>
            &nbsp;
            <Button kind="tag" uppercase href="/#">
              finance
            </Button>
          </div>
          <div style={{ width: '25%', margin: '10px' }}>
            <Button fullWidth>sign up &mdash; it's free!</Button>
          </div>
          <div style={{ width: '25%', margin: '10px' }}>
            <Button fullWidth secondary>
              Already have an account? Log in
            </Button>
          </div>
          <div style={{ width: '25%', margin: '10px' }}>
            <Input type="text" placeholder="default textbox style" />
          </div>
          <div style={{ width: '25%', margin: '10px' }}>
            <Input type="text" rounded />
            <StyledSwitch theme={lightTheme.secondary} />
          </div>
          <div style={{ width: '25%', margin: '10px' }}>
            <StyledSelect
              id="test"
              items={[{ text: 'RECENTLY UPDATED', value: '1' }, { text: 'test 2', value: '2' }]}
            />
          </div>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
