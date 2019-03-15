import React from 'react';

import Brand from '@digix/gov-ui/components/common/elements/icons/Brand';

import Search from '@digix/gov-ui/components/common/blocks/navbar/search';
import WalletButton from '@digix/gov-ui/components/common/blocks/navbar/wallet';
import { HeaderWrapper } from '@digix/gov-ui/components/common/blocks/navbar/style';
import Utility from '@digix/gov-ui/components/common/blocks/navbar/utility';

class NavBar extends React.Component {
  render() {
    return (
      <HeaderWrapper>
        <Search />
        <WalletButton />
        <Brand />
        <Utility />
      </HeaderWrapper>
    );
  }
}

export default NavBar;
