import React, { Component, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';

import LeftMenu from '../components/common/collapsible-menu';
import Button from '../components/common/buttons';
import Input from '../components/common/textfield';

import lightTheme from '../theme/light';

class App extends Component {
  render() {
    console.log(lightTheme.primary.toString());
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <LeftMenu />
          <div
            style={{
              width: '25%',
              margin: '10px',
              padding: '20px',
              float: 'left',
            }}
          >
            <Button>create proposal</Button>
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
          </div>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
