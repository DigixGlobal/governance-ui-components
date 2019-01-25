import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  WizardContainer,
  WizardMenu,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class Wizard extends React.Component {
  render() {
    const { stages, step } = this.props;
    const wizardItems = stages.map((stage, index) => {
      if (!stage.title) {
        return null;
      }

      return (
        <WizardMenu
          active={step === index}
          data-digix={`KycOverlay-WizardMenu-${stage.key}`}
          key={stage.key}
        >
          {stage.title}
        </WizardMenu>
      );
    });

    return <WizardContainer>{wizardItems}</WizardContainer>;
  }
}

const { array, number } = PropTypes;

Wizard.propTypes = {
  stages: array.isRequired,
  step: number.isRequired,
};

const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  {}
)(Wizard);
