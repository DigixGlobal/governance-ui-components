import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
} from '@digix/gov-ui/components/common/common-styles';

class KycOverlayBasicInformation extends React.Component {
  render() {
    return (
      <IntroContainer>
        <Header uppercase>Basic Information</Header>
        <Button onClick={() => this.props.onNextStep()}>Next</Button>
      </IntroContainer>
    );
  }
}

const { func } = PropTypes;

KycOverlayBasicInformation.propTypes = {
  onNextStep: func.isRequired,
};

const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {}
  )(KycOverlayBasicInformation)
);
