import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import { CallToAction } from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayIntro extends React.Component {
  render() {
    return (
      <div>
        <div>
          The objective of this process is to prevent Digix from being used intentionally or
          unintentionally, by criminal elements for money laundering activities. Related procedures
          also enable us to better understand our community and their financial dealings. It helps
          us manage our risks prudently.
        </div>
        <CallToAction>
          <Button
            fluid
            large
            secondary
            data-digix="KycOverlay-ProceedToKyc"
            onClick={() => this.props.onNextStep()}
          >
            Proceed to KYC
          </Button>
        </CallToAction>
      </div>
    );
  }
}

const { func } = PropTypes;
KycOverlayIntro.propTypes = {
  onNextStep: func.isRequired,
};

export default KycOverlayIntro;
