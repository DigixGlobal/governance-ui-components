import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { getAddressDetailsVanilla } from '@digix/gov-ui/reducers/info-server/actions';

import { showSignChallenge } from '@digix/gov-ui/reducers/gov-ui/actions';

class Utility extends React.Component {
  componentWillReceiveProps = nextProps => {
    if (!_.isEqual(nextProps, this.props)) {
      const { userAddress } = nextProps;
      if (userAddress && userAddress.address) {
        this.getDetailsInterval = setInterval(() => {
          getAddressDetailsVanilla(userAddress.address)
            .then(({ json: { result } }) => result)
            .then(details => {
              if (details.isParticipant) {
                this.getDetailsInterval = undefined;
                this.props.showSignChallenge(true);
              }
            });
        }, 1000 * 30);
      }
    }
  };

  componentWillUnmount = () => {
    this.getDetailsInterval = undefined;
  };

  render() {
    return <Fragment />;
  }
}

const { func, object } = PropTypes;

Utility.propTypes = {
  showSignChallenge: func.isRequired,
  userAddress: object,// eslint-disable-line
};

Utility.defaultProps = {
  userAddress: undefined,
};

const mapStateToProps = state => ({
  userAddress: state.govUI.UserAddress,
});

export default connect(
  mapStateToProps,
  { showSignChallenge }
)(Utility);
