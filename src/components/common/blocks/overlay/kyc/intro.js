import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

class KycOverlayIntro extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>KYC</Header>
        <Button onClick={() => this.props.onNextStep()}>Proceed to KYC</Button>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

KycOverlayIntro.propTypes = {
  onNextStep: func.isRequired,
};

const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(KycOverlayIntro)
);
