import React from 'react';

import { Icon } from '@digix/gov-ui/components/common/elements/index';
import { NavItem, Selector, TransButton, Item } from './style.js';

class Translator extends React.Component {
  render() {
    return (
      <NavItem dropdown>
        <TransButton kind="link">
          <span>English</span>
          <Icon kind="arrow" />
        </TransButton>
        <Selector>
          <Item>
            <a href="/">CHINESE</a>
          </Item>
        </Selector>
      </NavItem>
    );
  }
}

export default Translator;
