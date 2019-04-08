import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Icon } from '@digix/gov-ui/components/common/elements/index';

import { setLanguageTranslation } from '@digix/gov-ui/reducers/gov-ui/actions';
import { getTranslations } from '@digix/gov-ui/reducers/dao-server/actions';

import { NavItem, Selector, TransButton, Item } from './style.js';

const LANGUAGES = [
  {
    code: 'en',
    name: 'ENGLISH',
  },
  {
    code: 'cn',
    name: 'CHINESE',
  },
];
class Translator extends React.Component {
  handleLanguageChange = lang => () => {
    const { setLanguage, getTranslation } = this.props;
    if (!lang) {
      setLanguage('en');
    } else {
      setLanguage(lang);
    }
    getTranslation(lang);
  };

  render() {
    const { language } = this.props;

    const selectedLanguage = LANGUAGES.find(l => l.code === language);

    const options = LANGUAGES.filter(l => l.code !== language);

    return (
      <NavItem dropdown>
        <TransButton kind="link" onClick={this.handleLanguageChange(selectedLanguage.code)}>
          <span>{selectedLanguage.name}</span>
          <Icon kind="arrow" />
        </TransButton>
        <Selector>
          {options.map(l => (
            <Item onClick={this.handleLanguageChange(l.code)}>{l.name}</Item>
          ))}
        </Selector>
      </NavItem>
    );
  }
}

Translator.propTypes = {
  setLanguage: PropTypes.func.isRequired,
  getTranslation: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  language: state.govUI.Language,
});

export default connect(
  mapStateToProps,
  { setLanguage: setLanguageTranslation, getTranslation: getTranslations }
)(Translator);
