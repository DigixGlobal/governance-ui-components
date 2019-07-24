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
            <p>We'll be back by 6: 00pm SGT (GMT + 8 ) 25/07/2019 . Thank you for your patience.</p>
            <p>
              We are currently doing a full resync of the Ethereum blockchain into our info server
              in order to clear up some corrupted data that we received from our{' '}
              <a href="https://twitter.com/DigixGlobal/status/1137895228667379712">Infura</a>{' '}
              endpoint.
            </p>
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
