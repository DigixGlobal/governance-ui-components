import React from 'react';
import {
  WizardContainer,
  WizardMenu,
} from '@digix/gov-ui/components/common/blocks/overlay/kyc/style.js';

class Wizard extends React.Component {
  render() {
    return (
      <WizardContainer>
        <WizardMenu active>Basic Information</WizardMenu>
        <WizardMenu>Residence Proof</WizardMenu>
        <WizardMenu>Photo Proof</WizardMenu>
      </WizardContainer>
    );
  }
}

export default Wizard;
