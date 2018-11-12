import React from 'react';

import { Button } from '../../../components/common/elements/index';
import { CreateWrapper, TabPanel, MenuItem, Header, LeftCol, RightCol, Heading } from './style';

import Details from './forms/details';
import Milestones from './forms/milestones';
import Multimedia from './forms/multimedia';
import Overview from './forms/overview';
import { sendTransactionToDaoServer } from '../../../reducers/dao-server/actions';

const steps = [Overview, Details, Multimedia, Milestones];

class CreateProposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      canMoveNext: true,
      canMovePrevious: false,
    };
  }

  onNextButtonClick = () => {
    const { currentStep } = this.state;
    const nextStep = currentStep + 1;
    if (nextStep < steps.length - 1) {
      this.setState({ currentStep: nextStep, canMovePrevious: true });
    } else if (nextStep === steps.length - 1) {
      this.setState({ currentStep: nextStep, canMoveNext: false, canMovePrevious: true });
    }
  };

  onPreviousButtonClick = () => {
    const { currentStep } = this.state;
    const prevStep = currentStep - 1;
    if (prevStep > 0) {
      this.setState({ currentStep: prevStep, canMoveNext: true });
    } else {
      this.setState({ currentStep: prevStep, canMoveNext: true, canMovePrevious: false });
    }
  };

  useStep = step => {
    this.setState({
      currentStep: step,
      canMovePrevious: step > 0,
      canMoveNext: step < steps.length - 1,
    });
  };

  renderStep = () => {
    const { currentStep } = this.state;
    const Step = steps[currentStep];
    return <Step />;
  };

  render() {
    const { currentStep, canMoveNext, canMovePrevious } = this.state;
    return (
      <CreateWrapper>
        <TabPanel>
          <MenuItem active={currentStep === 0} onClick={() => this.useStep(0)}>
            Overview
          </MenuItem>
          <MenuItem active={currentStep === 1} onClick={() => this.useStep(1)}>
            Project Detail
          </MenuItem>
          <MenuItem active={currentStep === 2} onClick={() => this.useStep(2)}>
            Multimedia
          </MenuItem>
          <MenuItem active={currentStep === 3} onClick={() => this.useStep(3)}>
            Milestone
          </MenuItem>
        </TabPanel>
        <Header>
          <LeftCol>
            <Heading>Basic Project Information</Heading>
          </LeftCol>
          <RightCol>
            <Button secondary>Preview</Button>
            <Button disabled={!canMovePrevious} primary ghost onClick={this.onPreviousButtonClick}>
              Previous
            </Button>
            <Button disabled={!canMoveNext} primary ghost onClick={this.onNextButtonClick}>
              Next
            </Button>
          </RightCol>
        </Header>
        {this.renderStep()}
      </CreateWrapper>
    );
  }
}

export default CreateProposal;
