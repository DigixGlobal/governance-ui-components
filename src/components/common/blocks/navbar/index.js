import React from 'react';
import PropTypes from 'prop-types';

import Menu from './menu';
import Search from './search';
import Wallet from './wallet';
import Utility from './utility';
import Brand from '../../elements/icons/Brand';

import { HeaderWrapper } from './style';

class NavBar extends React.Component {
  render() {
    const { onWalletClick } = this.props;
    return (
      <HeaderWrapper>
        <Menu />
        <Search />
        <Wallet onWalletClick={onWalletClick} />
        <Utility />
        <Brand />
      </HeaderWrapper>
    );
  }
}

const { func } = PropTypes;

NavBar.propTypes = {
  onWalletClick: func.isRequired,
};
export default NavBar;
