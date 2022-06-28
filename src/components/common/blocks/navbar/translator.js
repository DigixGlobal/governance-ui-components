import React from 'react';
import { Icon } from '@digix/gov-ui/components/common/elements/index';
import {
  Item,
  NavItem,
  Selector,
  TransButton,
} from './style.js';

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'ENGLISH',
  },
  {
    code: 'cn',
    name: '中文',
  },
];

class Translator extends React.Component {
  handleLanguageChange = lang => () => {
    if (!lang) {
      localStorage.setItem('i18nextLng', 'en-US');
    } else {
      localStorage.setItem('i18nextLng', lang);
    }

    window.location.reload();
  };

  render() {
    const storedLng = localStorage.getItem('i18nextLng');
    const selectedLanguage = LANGUAGES.find(l => l.code === storedLng) || LANGUAGES[0];
    const options = LANGUAGES.filter(l => l.code !== storedLng);

    return (
      <NavItem dropdown>
        <TransButton
          kind="link"
          onClick={this.handleLanguageChange(selectedLanguage.code)}
        >
          <span>{selectedLanguage.name}</span>
          <Icon kind="arrow" />
        </TransButton>
        <Selector>
          {options.map(l => (
            <Item
              key={l.code}
              onClick={this.handleLanguageChange(l.code)}
            >
              {l.name}
            </Item>
          ))}
        </Selector>
      </NavItem>
    );
  }
}

export default Translator;
