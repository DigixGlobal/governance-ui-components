import React from 'react';
import { push as Menu } from 'react-burger-menu';
import './style.css';

import LeftMenu from '../collapsible-menu';

const SideBar = props => (
  <Menu noOverlay {...props}>
    <LeftMenu location={this.props.location} />
    {/* <a className="menu-item" href="/">
      Home
    </a>

    <a className="menu-item" href="/burgers">
      Burgers
    </a>

    <a className="menu-item" href="/pizzas">
      Pizzas
    </a>

    <a className="menu-item" href="/desserts">
      Desserts
    </a> */}
  </Menu>
);

export default SideBar;
