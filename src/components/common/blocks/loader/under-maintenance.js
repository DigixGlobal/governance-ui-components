import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { getTranslations } from '@digix/gov-ui/reducers/dao-server/actions';

import ScreenLoader from '@digix/gov-ui/components/common/blocks/loader/screen';
import { Icon } from '@digix/gov-ui/components/common/index';
import {
  Preloaders,
  Maintenance,
  Content,
} from '@digix/gov-ui/components/common/blocks/loader/style';

class UnderMaintenance extends React.Component {
  componentDidMount = () => {
    const { Language, getTranslationsAction, Translations } = this.props;

    if (!Translations.data) {
      getTranslationsAction(Language);
    }
  };

  render() {
    if (!this.props.Translations.data) return null;
    const {
      Translations: {
        data: {
          common: { maintenance },
        },
      },
      height,
    } = this.props;
    return (
      <Preloaders height={height}>
        <Maintenance>
          <Content>
            <Icon kind="repair" large style={{ marginBottom: '2rem' }} />
            <h1>{maintenance.title}</h1>
            <p>{maintenance.description}</p>
          </Content>
        </Maintenance>

        <ScreenLoader />
      </Preloaders>
    );
  }
}

const { object, string, func } = PropTypes;
UnderMaintenance.propTypes = {
  Translations: object.isRequired,
  getTranslationsAction: func.isRequired,
  Language: string,
  height: string,
};

UnderMaintenance.defaultProps = {
  height: '100vh',
  Language: 'en',
};

const mapStateToProps = state => {
  const {
    daoServer: { Translations },
  } = state;

  return {
    Translations,
  };
};

export default connect(
  mapStateToProps,
  { getTranslationsAction: getTranslations }
)(UnderMaintenance);
