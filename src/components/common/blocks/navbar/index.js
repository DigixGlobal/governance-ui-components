import React from 'react';

import Search from '@digix/gov-ui/components/common/blocks/navbar/search';
import WalletButton from '@digix/gov-ui/components/common/blocks/navbar/wallet';
import { Header, Digix, NavItem } from '@digix/gov-ui/components/common/blocks/navbar/style';
import Translator from '@digix/gov-ui/components/common/blocks/navbar/translator';
import Utility from '@digix/gov-ui/components/common/blocks/navbar/utility';

class NavBar extends React.Component {
  render() {
    return (
      <Header id="nav-wrap">
        <Search />
        <Translator />
        <WalletButton />
        <NavItem>
          <Digix kind="logo" />
        </NavItem>
        <Utility />
      </Header>
    );
  }
}

export default NavBar;
