import React from 'react';

import Search from '@digix/gov-ui/components/common/blocks/navbar/search';
import WalletButton from '@digix/gov-ui/components/common/blocks/navbar/wallet';
import { Header, Digix, NavItem } from '@digix/gov-ui/components/common/blocks/navbar/style';
import Translator from '@digix/gov-ui/components/common/blocks/navbar/translator';

class NavBar extends React.Component {
  render() {
    return (
      <Header>
        <Search />
        <Translator />
        <WalletButton />
        <NavItem>
          <Digix kind="logo" />
        </NavItem>
      </Header>
    );
  }
}

export default NavBar;
