import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import { CallToAction } from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class KycOverlayIntro extends React.Component {
  render() {
    const t = this.props.translations.OpenKycForm;

    return (
      <div>
        <div>{t.instructions}</div>
        <CallToAction>
          <Button
            fluid
            large
            secondary
            data-digix="KycOverlay-ProceedToKyc"
            onClick={() => this.props.onNextStep()}
          >
            {t.submit}
          </Button>
        </CallToAction>
      </div>
    );
  }
}

const { func, object } = PropTypes;
KycOverlayIntro.propTypes = {
  onNextStep: func.isRequired,
  translations: object.isRequired,
};

export default KycOverlayIntro;
