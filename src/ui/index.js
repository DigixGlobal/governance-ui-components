import React, { Component, Fragment } from 'react';

import LeftMenu from '../components/common/collapsible-menu';
import Button from '../components/common/buttons';


class App extends Component {
  render() {
    return (
      <Fragment>
        <LeftMenu />
        <div style={{width: '25%', margin: '10px', padding: '20px', float:'left'}}>
          <Button kind="capsule">create proposal</Button>&nbsp;
          <Button kind="capsule" secondary>PARTICIPATE</Button>
        </div>
        <div style={{width: '25%', margin: '10px'}}>
         <Button kind="capsule" fullWidth>sign up &mdash; it's free!</Button>
        </div>
        <div style={{width: '25%', margin: '10px'}}>
        <Button kind="capsule" fullWidth secondary>Already have an account? Log in</Button>

        </div>
      </Fragment>
    );
  }
}

export default App;
