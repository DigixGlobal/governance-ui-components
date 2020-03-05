import { ETHERSCAN_URL } from '@digix/gov-ui/constants';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { showHideAlert } from '@digix/gov-ui/reducers/gov-ui/actions';
import { withTranslation } from 'react-i18next';
import {
  SnackbarAction,
  SnackbarLink,
  SnackbarDesc,
  SnackbarContainer,
  SnackbarTag,
} from '@digix/gov-ui/components/common/elements/snackbar/style';

class Snackbar extends React.Component {
  componentWillReceiveProps = (nextProps) => {
    const { alertData } = nextProps;
    if (!alertData) {
      return;
    }

    const { timer } = alertData;
    if (timer) {
      this.interval = setTimeout(() => {
        this.props.showHideAlert({ message: undefined });
      }, 1000 * alertData.timer);
    }
  };

  closeSnackbar = () => {
    this.props.showHideAlert({ message: undefined });
  }

  render() {
    const { alertData, t } = this.props;
    if (!alertData || !alertData.message) {
      return null;
    }

    const {
      status,
      statusMessage,
      message,
      timer,
      txHash,
    } = alertData;
    return (
      <SnackbarContainer data-digix="Snackbar-Container">
        {status && statusMessage && (
          <SnackbarTag
            actionable={status === 'success'}
            kind="tag"
          >
            {statusMessage}
          </SnackbarTag>
        )}
        <SnackbarDesc>
          {message}
        </SnackbarDesc>
        {txHash && (
          <SnackbarLink
            href={`${ETHERSCAN_URL}${txHash}`}
            target="_blank"
            data-digix="Snackbar-Hash"
          >
            {t('view')}
          </SnackbarLink>
        )}
        {!timer && (
          <SnackbarAction
            kind="text"
            onClick={this.closeSnackbar}
            data-digix="Snackbar-Close"
          >
            {t('close')}
          </SnackbarAction>
        )}
      </SnackbarContainer>
    );
  }
}

const { func, object } = PropTypes;

Snackbar.propTypes = {
  alertData: object,
  showHideAlert: func.isRequired,
  t: func.isRequired,
};

Snackbar.defaultProps = {
  alertData: undefined,
};

const mapStateToProps = ({ govUI: { Alert: alertData } }) => ({
  alertData,
});
export default withTranslation('Snackbar')(
  connect(
    mapStateToProps,
    { showHideAlert }
  )(Snackbar)
);
