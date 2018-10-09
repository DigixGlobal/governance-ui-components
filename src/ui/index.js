import React, { Component, Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import NavBar from '../components/common/blocks/navbar';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';

import LeftMenu from '../components/common/blocks/collapsible-menu';
import Timeline from '../components/common/blocks/timeline';
import DashboardStats from '../components/common/blocks/user-DAO-stats/index';

// import StyledSwitch from '../components/common/switch';
// import StyledSelect from '../components/common/select';
// import { Row, Col1Of3 } from '../components/common/grid/style';
// import Dashboard from '../components/dashboard';
import ProposalCard from '../components/proposal-card';

import lightTheme from '../theme/light';

import { Container } from './style';

const ContentWrapper = styled.div`
  flex: 5 0 0;
  padding: 5em;
`;

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={lightTheme}>
        <Fragment>
          <NavBar />
          <Container>
            <LeftMenu />
            <ContentWrapper>
              <Timeline />
              <DashboardStats />
              <ProposalCard />
            </ContentWrapper>
          </Container>

          <Container>
            {/* <Button primary>create proposal</Button>
            &nbsp;
            <Button secondary>PARTICIPATE</Button>
            &nbsp;
            <Button kind="tag" uppercase href="/#">
              finance
            </Button> */}
          </Container>

          {/* <Container>
            <StyledSwitch theme={lightTheme.secondary} />
          </Container> */}
          {/* <Container>
            <StyledSelect
              id="test"
              items={[{ text: 'RECENTLY UPDATED', value: '1' }, { text: 'test 2', value: '2' }]}
            />
          </Container> */}
          {/* <Container width="100%">
            <Row>
              <Col1Of3>column 1</Col1Of3>
              <Col1Of3>column 2</Col1Of3>
              <Col1Of3>Column 3</Col1Of3>
            </Row>
          </Container> */}
          {/* <Container width="100%">
            <Dashboard
              items={[
                { count: 385, label: 'total proposals submitted' },
                { count: 102, label: 'total proposals funded' },
                { count: 56, label: 'total proposals disbursed' },
              ]}
            />
          </Container> */}
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
