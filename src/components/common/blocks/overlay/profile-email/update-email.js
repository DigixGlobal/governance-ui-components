import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { withChangeEmail } from '@digix/gov-ui/api/graphql-queries/users';

class UpdateEmailButton extends React.Component {
  render() {
    const { changeEmail, disable, email } = this.props;
    const disableButton = disable || !email;

    return (
      <Button
        secondary
        fluid
        large
        disabled={disableButton}
        data-digix="EmailOverlay-SetEmail"
        onClick={() => changeEmail(email)}
      >
        Change Email
      </Button>
    );
  }
}

const { bool, func, string } = PropTypes;

UpdateEmailButton.propTypes = {
  changeEmail: func,
  disable: bool.isRequired,
  email: string,
};

UpdateEmailButton.defaultProps = {
  changeEmail: undefined,
  email: undefined,
};

const mapStateToProps = () => ({});

export default withChangeEmail(
  connect(
    mapStateToProps,
    {}
  )(UpdateEmailButton)
);
