import React from 'react';

import Search from '@digix/gov-ui/components/common/blocks/navbar/search';
import WalletButton from '@digix/gov-ui/components/common/blocks/navbar/wallet';
import { HeaderWrapper, Digix } from '@digix/gov-ui/components/common/blocks/navbar/style';
import Utility from '@digix/gov-ui/components/common/blocks/navbar/utility';

class NavBar extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Search />
        <WalletButton />
        <Digix kind="logo" />
        <Utility />
      </HeaderWrapper>
    );
  }
}

export default NavBar;
