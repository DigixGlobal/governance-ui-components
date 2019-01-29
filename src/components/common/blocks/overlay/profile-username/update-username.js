import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '@digix/gov-ui/components/common/elements/index';
import { withChangeUsername } from '@digix/gov-ui/api/graphql-queries/users';

class UpdateUsernameButton extends React.Component {
  render() {
    const { changeUsername, disable, username } = this.props;
    const disableButton = disable || !username;

    return (
      <Button
        primary
        fluid
        large
        disabled={disableButton}
        data-digix="UsernameOverlay-SetUsername"
        onClick={() => changeUsername(username)}
      >
        Change Username
      </Button>
    );
  }
}

const { bool, func, string } = PropTypes;

UpdateUsernameButton.propTypes = {
  changeUsername: func.isRequired,
  disable: bool.isRequired,
  username: string,
};

UpdateUsernameButton.defaultProps = {
  username: undefined,
};

const mapStateToProps = () => ({});

export default withChangeUsername(
  connect(
    mapStateToProps,
    {}
  )(UpdateUsernameButton)
);
