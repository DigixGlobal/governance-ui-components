import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateUsernameButton from '@digix/gov-ui/components/common/blocks/overlay/profile-username/update-username';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  CallToAction,
  UsernameInput,
} from '@digix/gov-ui/components/common/blocks/overlay/profile-username/style';
import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

class UsernameOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      showIntro: true,
      username: '',
    };

    this.USERNAME_REGEX = /^(?!user)[a-z0-9_]{2,20}$/;
    this.ERROR_MESSAGES = {
      invalid: `Username must be between 2-20 characters, can only be composed of alphanumeric and underscore characters, and must not begin with the word "user".`,
      connectionError: `Unable to update username. Please try again.`,
    };
  }

  onUsernameUpdate = response => {
    const { errors } = response.changeUsername;
    if (errors.length) {
      this.setState({ error: errors[0].message });
      return;
    }

    this.props.showRightPanel({ show: false });
    this.props.showHideAlert({
      message: 'Username updated',
    });
  };

  onUsernameUpdateError = () => {
    this.setState({
      error: this.ERROR_MESSAGES.connectionError,
    });
  };

  handleInput = e => {
    const username = e.target.value.toLowerCase().trim();
    let error;

    if (!this.USERNAME_REGEX.test(username)) {
      error = this.ERROR_MESSAGES.invalid;
    }

    this.setState({ username, error });
  };

  showForm = () => {
    this.setState({
      showIntro: false,
    });
  };

  renderHint = () => {
    const { error } = this.state;
    if (!error) {
      return null;
    }

    return <Hint error>{error}</Hint>;
  };

  renderIntro() {
    return (
      <IntroContainer>
        <Header uppercase>Assign Username</Header>
        <Notifications warning>
          You can only assign a username to yourself <span>ONCE</span>.
        </Notifications>
        <Button
          secondary
          fluid
          large
          data-digix="UsernameOverlay-Proceed"
          onClick={() => this.showForm()}
        >
          Proceed
        </Button>
      </IntroContainer>
    );
  }

  renderForm() {
    const { username, error } = this.state;
    const invalidInput = !!error && error !== this.ERROR_MESSAGES.connectionError;
    const disableButton = !username || username === '' || invalidInput;

    return (
      <IntroContainer>
        <Header uppercase>Assign Username</Header>
        <Label>Please enter your desired user name</Label>
        <UsernameInput type="text" data-digix="SetUsername-TexBox" onChange={this.handleInput} />
        {this.renderHint()}
        <CallToAction>
          <UpdateUsernameButton
            disable={disableButton}
            username={username}
            onUsernameUpdate={this.onUsernameUpdate}
            onUsernameUpdateError={this.onUsernameUpdateError}
          />
        </CallToAction>
      </IntroContainer>
    );
  }

  render() {
    const { showIntro } = this.state;
    if (showIntro) {
      return this.renderIntro();
    }

    return this.renderForm();
  }
}

const { func } = PropTypes;
UsernameOverlay.propTypes = {
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
};

const mapStateToProps = () => ({});
export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
    }
  )(UsernameOverlay)
);
