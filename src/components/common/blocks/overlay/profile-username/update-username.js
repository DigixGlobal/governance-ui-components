import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { withChangeUsername } from '@digix/gov-ui/api/graphql-queries/users';

class UpdateUsernameButton extends React.Component {
  render() {
    const { changeUsername, disable, translations, username } = this.props;
    const disableButton = disable || !username;

    return (
      <Button
        secondary
        fluid
        large
        disabled={disableButton}
        data-digix="UsernameOverlay-SetUsername"
        onClick={() => changeUsername(username)}
      >
        {translations.submit}
      </Button>
    );
  }
}

const { bool, func, object, string } = PropTypes;

UpdateUsernameButton.propTypes = {
  changeUsername: func,
  disable: bool.isRequired,
  translations: object.isRequired,
  username: string,
};

UpdateUsernameButton.defaultProps = {
  changeUsername: undefined,
  username: undefined,
};

const mapStateToProps = () => ({});

export default withChangeUsername(
  connect(
    mapStateToProps,
    {}
  )(UpdateUsernameButton)
);
