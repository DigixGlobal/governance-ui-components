import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';
import { CallToAction } from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayIntro extends React.Component {
  render() {
    return (
      <IntroContainer>
        <div>
          The objective of this process is to prevent Digix from being used intentionally or
          unintentionally, by criminal elements for money laundering activities. Related procedures
          also enable us to better understand our community and their financial dealings. It helps
          us manage our risks prudently.
        </div>
        <CallToAction>
          <Button secondary large fluid onClick={() => this.props.onNextStep()}>
            Proceed to KYC
          </Button>
        </CallToAction>
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
