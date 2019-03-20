import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UpdateEmailButton from '@digix/gov-ui/components/common/blocks/overlay/profile-email/update-email';
import web3Connect from 'spectrum-lightsuite/src/helpers/web3/connect';
import { CallToAction } from '@digix/gov-ui/components/common/blocks/overlay/profile-email/style';
import { Input } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Label,
  Hint,
} from '@digix/gov-ui/components/common/common-styles';
import { showHideAlert, showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

class EmailOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      error: undefined,
    };

    // eslint-disable-next-line
    this.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.ERROR_MESSAGES = {
      invalid: `Please enter a valid email address.`,
      unchanged: `Please enter an email address that is different from your current email.`,
      connectionError: `Unable to update email. Please try again.`,
    };
  }

  onEmailUpdate = response => {
    const { errors } = response.changeEmail;
    if (errors.length) {
      this.setState({ error: errors[0].message });
      return;
    }

    this.props.showRightPanel({ show: false });
    this.props.showHideAlert({
      message: 'Email updated',
    });
  };

  onEmailUpdateError = () => {
    this.setState({
      error: this.ERROR_MESSAGES.connectionError,
    });
  };

  handleInput = e => {
    const email = e.target.value.trim();
    const { currentEmail } = this.props;
    let error;

    if (!this.EMAIL_REGEX.test(email)) {
      error = this.ERROR_MESSAGES.invalid;
    } else if (currentEmail && email === currentEmail) {
      error = this.ERROR_MESSAGES.unchanged;
    }

    this.setState({ email, error });
  };

  renderHint = () => {
    const { error } = this.state;
    if (!error) {
      return null;
    }

    return <Hint error>{error}</Hint>;
  };

  render() {
    const { email, error } = this.state;
    const invalidInput = !!error && error !== this.ERROR_MESSAGES.connectionError;
    const disableButton = !email || email === '' || invalidInput;

    return (
      <IntroContainer>
        <Header uppercase>Set Email</Header>
        <Label>Please enter the email you want to link to your address</Label>
        <Input type="text" data-digix="SetEmail-Textbox" onChange={this.handleInput} />
        {this.renderHint()}
        <CallToAction>
          <UpdateEmailButton
            disable={disableButton}
            email={email}
            onEmailUpdate={this.onEmailUpdate}
            onEmailUpdateError={this.onEmailUpdateError}
          />
        </CallToAction>
      </IntroContainer>
    );
  }
}

const { func, string } = PropTypes;

EmailOverlay.propTypes = {
  currentEmail: string,
  showHideAlert: func.isRequired,
  showRightPanel: func.isRequired,
};

EmailOverlay.defaultProps = {
  currentEmail: '',
};

const mapStateToProps = () => ({});

export default web3Connect(
  connect(
    mapStateToProps,
    {
      showHideAlert,
      showRightPanel,
    }
  )(EmailOverlay)
);
