import React, { Component, Fragment } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import lightTheme from '@digix/gov-ui/theme/light';
import LeftMenu from '@digix/gov-ui/components/common/blocks/collapsible-menu';
import NavBar from '@digix/gov-ui/components/common/blocks/navbar';
import ProposalCard from '@digix/gov-ui/components/proposal-card';
import Timeline from '@digix/gov-ui/components/common/blocks/timeline';
import UserAddressStats from '@digix/gov-ui/components/common/blocks/user-address-stats/style';
import { Container } from '@digix/gov-ui/ui/style';

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
              <UserAddressStats />
              <ProposalCard />
            </ContentWrapper>
          </Container>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default App;
