import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button } from '@digix/gov-ui/components/common/elements/index';
import {
  IntroContainer,
  OverlayHeader as Header,
  Notifications,
  Message,
} from '@digix/gov-ui/components/common/common-styles';
import { showRightPanel } from '@digix/gov-ui/reducers/gov-ui/actions';

class ErrorMessageOverlay extends React.Component {
  closeOverlay() {
    document.body.classList.remove('modal-is-open');
    this.props.showRightPanel({
      show: false,
    });
  }

  renderNotification = error => {
    const { details, description, title } = error;

    return (
      <Notifications error key={title} data-digix="ProjectError-Notification">
        <Message uppercase data-digix="ProjectError-Notification-Title">
          {title}
        </Message>
        <p>{description}</p>
        {details && <p>{details}</p>}
      </Notifications>
    );
  };

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
          {location}
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
  location: 'Return',
};

const mapStateToProps = () => ({});
export default connect(
  mapStateToProps,
  {
    showRightPanel,
  }
)(ErrorMessageOverlay);
