import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateUsernameButton from '@digix/gov-ui/components/common/blocks/overlay/profile-username/update-username';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  CallToAction,
  NotificationMessage,
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
    this.ERROR_MESSAGES = { ...props.translations.Errors };
  }

  onUsernameUpdate = response => {
    const { errors } = response.changeUsername;
    const { Errors: tErrors } = this.props.translations;
    if (errors.length) {
      if (errors[0].message === tErrors.usernameTaken)
        return this.setState({ error: tErrors.usernameTaken });

      return this.setState({ error: errors[0].message });
    }

    this.props.showRightPanel({ show: false });
    this.props.showHideAlert({
      message: this.props.translations.txnSuccess,
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
    const t = this.props.translations;

    return (
      <IntroContainer>
        <Header uppercase>{t.title}</Header>
        <Notifications info>
          <NotificationMessage>
            <ReactMarkdown source={t.warning} />
          </NotificationMessage>
        </Notifications>
        <Button
          secondary
          fluid
          large
          data-digix="UsernameOverlay-Proceed"
          onClick={() => this.showForm()}
        >
          {t.proceed}
        </Button>
      </IntroContainer>
    );
  }

  renderForm() {
    const t = this.props.translations;
    const { username, error } = this.state;
    const invalidInput = !!error && error !== this.ERROR_MESSAGES.connectionError;
    const disableButton = !username || username === '' || invalidInput;

    return (
      <IntroContainer>
        <Header uppercase>{t.title}</Header>
        <Label>{t.instructions}</Label>
        <UsernameInput type="text" data-digix="SetUsername-TexBox" onChange={this.handleInput} />
        {this.renderHint()}
        <CallToAction>
          <UpdateUsernameButton
            disable={disableButton}
            onUsernameUpdate={this.onUsernameUpdate}
            onUsernameUpdateError={this.onUsernameUpdateError}
            translations={t}
            username={username}
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

const { func, object } = PropTypes;
UsernameOverlay.propTypes = {
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
  translations: object.isRequired,
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
