import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { withChangeEmail } from '@digix/gov-ui/api/graphql-queries/users';

class UpdateEmailButton extends React.Component {
  render() {
    const { changeEmail, disable, email, translations } = this.props;
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
        {translations.submit}
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

UpdateEmailButton.propTypes = {
  changeEmail: func,
  disable: bool.isRequired,
  email: string,
  translations: object.isRequired,
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
