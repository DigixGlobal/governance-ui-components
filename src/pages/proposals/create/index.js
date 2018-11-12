import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { toBigNumber } from 'spectrum-lightsuite/src/helpers/stringUtils';

import SpectrumConfig from 'spectrum-lightsuite/spectrum.config';
import Dao from '@digix/dao-contracts/build/contracts/Dao.json';

import { getDefaultAddress } from 'spectrum-lightsuite/src/selectors';

import { Button } from '../../../components/common/elements/index';
import { CreateWrapper, TabPanel, MenuItem, Header, LeftCol, RightCol, Heading } from './style';

import Details from './forms/details';
import Milestones from './forms/milestones';
import Multimedia from './forms/multimedia';
import Overview from './forms/overview';
// import { sendTransactionToDaoServer } from '../../../reducers/dao-server/actions';
import { dijix } from '../../../utils/dijix';
import { encodeHash } from '../../../utils/helpers';

import getContract from '../../../utils/contracts';

import { DEFAULT_GAS, DEFAULT_GAS_PRICE, ONE_BILLION } from '../../../constants';

// import LockDgdTx from './tx-ui';

const network = SpectrumConfig.defaultNetworks[0];

const steps = [Overview, Details, Multimedia, Milestones];

class CreateProposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
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

  onChangeHandler = (e, value) => {
    const { form } = this.state;
    console.log({ e });
    if (e.target && e.target.id) {
      form[e.target.id] = e.target.value;
    } else if (e && value) {
      form[e] = value;
    }

    this.setState({ form: { ...form } });
  };

  useStep = step => {
    this.setState({
      currentStep: step,
      canMovePrevious: step > 0,
      canMoveNext: step < steps.length - 1,
    });
  };

  createAttestation = () => {
    const { form } = this.state;
    return dijix
      .create('attestation', {
        attestation: {
          ...form,
        },
        // proofs: [...proofs],
      })
      .then(({ ipfsHash }) => {
        const encodedHash = encodeHash(ipfsHash);
        return encodedHash;
      });
  };

  handleSubmit = () => {
    const { web3Redux, defaultAddress, ChallengeProof } = this.props;

    const { abi, address } = getContract(Dao, network);
    const contract = web3Redux
      .web3(network)
      .eth.contract(abi)
      .at(address);

    const web3Params = { gasPrice: DEFAULT_GAS_PRICE, gas: DEFAULT_GAS };

    const ui = {
      value: toBigNumber(2 * 1e18),
      type: 'lockDgd',
    };

    this.createAttestation().then(ipfsHash =>
      contract.submitPreproposal
        .sendTransaction(
          ipfsHash,
          [toBigNumber(2 * 1e18), toBigNumber(3 * 1e18)],
          toBigNumber(2 * 1e18),
          {
            from: defaultAddress.address,
            value: 2 * 1e18,
            ui,
            ...web3Params,
          }
        )

        .then(txHash => {
          console.log(txHash);
          // if (ChallengeProof.data) {
          //   this.setState({ txHash }, () => {
          //     sendTransactionToDaoServerAction({
          //       txHash,
          //       title: 'Lock DGD',
          //       token: ChallengeProof.data['access-token'],
          //       client: ChallengeProof.data.client,
          //       uid: ChallengeProof.data.uid,
          //     });
          //   });
          // } else {
          //   this.setState({ txHash }, () => {
          //     this.props.showHideAlert({ message: txHash });
          //   });
          // }
        })
        .catch(err => {
          console.log(err);
          console.log({
            ipfsHash,
            fundings: [2 * 1e18, 3 * 1e18],
            reward: toBigNumber(3 * ONE_BILLION),
            address: defaultAddress.address,
          });
        })
    );

    // this.setError();

    // console.log({
    //   ipfshHash,
    //   fund: [toBigNumber(2 * ONE_BILLION)],
    //   reward: toBigNumber(3 * ONE_BILLION),
    // });
  };

  renderStep = () => {
    const { currentStep } = this.state;
    const Step = steps[currentStep];
    return <Step onChange={this.onChangeHandler} />;
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
        <LeftCol>
          <Button secondary onClick={this.handleSubmit}>
            Submit
          </Button>
        </LeftCol>
      </CreateWrapper>
    );
  }
}

const { object } = PropTypes;
CreateProposal.propTypes = {
  web3Redux: object.isRequired,
  ChallengeProof: object.isRequired,
  defaultAddress: object,
};

CreateProposal.defaultProps = {
  defaultAddress: undefined,
};
const mapStateToProps = state => ({
  defaultAddress: getDefaultAddress(state),
  ChallengeProof: state.daoServer.ChallengeProof,
});

// export default web3Connect(conect(mapStateToProps)CreateProposal);

export default web3Connect(connect(mapStateToProps)(CreateProposal));

// export default CreateProposal;
