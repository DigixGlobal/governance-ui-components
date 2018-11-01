import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showTxSigningModal } from 'spectrum-lightsuite/src/actions/session';
import { showHideLockDgdOverlay } from '../../../../reducers/gov-ui/actions';

import TextField from '../../elements/textfield';

import Button from '../../../common/elements/buttons'; // '

import {
  Container,
  TransparentOverlay,
  WalletContainer,
  CloseButton,
  Header,
  LockDgdBox,
  InputDgxBox,
  TextCaption,
  StakeCaption,
} from './style';
import Icon from '../../../common/elements/icons';

class LockDgd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dgd: 0,
    };
  }
  componentWillMount = () => {
    const { lockDgdOverlay } = this.props;
    if (!lockDgdOverlay || !lockDgdOverlay.show) {
      document.body.classList.remove('modal-is-open');
    } else {
      document.body.classList.toggle('modal-is-open');
    }
  };

  onDgdInputChange = e => {
    const { value } = e.target;
    this.setState({ dgd: value });
  };
  render() {
    const { dgd } = this.state;
    const { lockDgdOverlay } = this.props;
    if (!lockDgdOverlay || !lockDgdOverlay.show) return null;
    return (
      <Container>
        <TransparentOverlay />
        <WalletContainer>
          <CloseButton>
            <Header>LOCK DGD</Header>
            <Icon kind="close" onClick={() => this.props.showHideLockDgdOverlay(false)} />
          </CloseButton>
          <LockDgdBox>You are now locking DGD in the staking Phase</LockDgdBox>
          <TextCaption>
            <strong>Please enter the amount of DGD you wish to lock in:</strong>
          </TextCaption>
          <InputDgxBox>
            <TextField type="number" onChange={this.onDgdInputChange} />
            DGD
          </InputDgxBox>
          {dgd > 0 && <StakeCaption>This will give you {dgd} STAKE in DigixDAO</StakeCaption>}
          <Button
            kind="round"
            primary
            ghost
            fluid
            onClick={this.handleButtonClick}
            style={{ marginTop: '4rem' }}
          >
            Lock DGD
          </Button>
        </WalletContainer>
      </Container>
    );
  }
}

LockDgd.propTypes = {
  lockDgdOverlay: PropTypes.object.isRequired,
  showTxSigningModal: PropTypes.func.isRequired,
  showHideLockDgdOverlay: PropTypes.func.isRequired,
};

export default connect(
  ({ govUI: { LockDgdOverlay } }) => ({
    lockDgdOverlay: LockDgdOverlay,
  }),
  {
    showTxSigningModal,
    showHideLockDgdOverlay,
  }
)(LockDgd);
