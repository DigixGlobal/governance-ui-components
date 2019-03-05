import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
} from '@digix/gov-ui/components/common/common-styles';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

class ErrorMessageOverlay extends React.Component {
  closeOverlay() {
    this.props.showRightPanel({
      show: false,
    });
  }

  renderNotification = error => (
    <Notifications error key={error.title} data-digix="ProjectError-Notification">
      <h3 data-digix="ProjectError-Notification-Title">{error.title}</h3>
      <p>{error.description}</p>
      <p>{error.details}</p>
    </Notifications>
  );

  render() {
    const { errors, location } = this.props;
    return (
      <IntroContainer>
        <Header uppercase>&nbsp;</Header>
        {errors.map(item => this.renderNotification(item))}
        <Button
          fluid
          large
          secondary
          data-digix="ProjectError-Return"
          onClick={() => this.closeOverlay()}
        >
          Return to {location}
        </Button>
      </IntroContainer>
    );
  }
}

const { array, func, string } = PropTypes;
ErrorMessageOverlay.propTypes = {
  errors: array.isRequired,
  location: string,
  showRightPanel: func.isRequired,
};

ErrorMessageOverlay.defaultProps = {
  location: 'Project',
};

const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  {
    showRightPanel,
  }
)(ErrorMessageOverlay);
