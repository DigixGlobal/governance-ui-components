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
import { Row, Col1Of3 } from '../components/common/grid/style';
import Dashboard from '../components/dashboard';
import ProposalCard from '../components/proposal-card';

import lightTheme from '../theme/light';

import { Container } from './style';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <Header>Create Proposal | Wallet</Header>
          <LeftMenu />
          <Container>
            <Button primary>create proposal</Button>
            &nbsp;
            <Button secondary>PARTICIPATE</Button>
            &nbsp;
            <Button kind="tag" uppercase href="/#">
              finance
            </Button>
          </Container>
          <Container>
            <Button fullWidth>sign up &mdash; it's free!</Button>
          </Container>
          <Container>
            <Button fullWidth secondary>
              Already have an account? Log in
            </Button>
          </Container>
          <Container>
            <Input type="text" placeholder="default textbox style" />
          </Container>
          <Container>
            <Input type="text" rounded />
            <StyledSwitch theme={lightTheme.secondary} />
          </Container>
          <Container>
            <StyledSelect
              id="test"
              items={[{ text: 'RECENTLY UPDATED', value: '1' }, { text: 'test 2', value: '2' }]}
            />
          </Container>
          <Container width="100%">
            <Row>
              <Col1Of3>column 1</Col1Of3>
              <Col1Of3>column 2</Col1Of3>
              <Col1Of3>Column 3</Col1Of3>
            </Row>
          </Container>
          <Container width="100%">
            <Dashboard
              items={[
                { count: 385, label: 'total proposals submitted' },
                { count: 102, label: 'total proposals funded' },
                { count: 56, label: 'total proposals disbursed' },
              ]}
            />
          </Container>
          <Container width="100%">
            <ProposalCard />
          </Container>
          <Container width="100%">&nbsp;</Container>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
