import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showHideWalletOverlay } from '@digix/gov-ui/reducers/gov-ui/actions';
import Brand from '@digix/gov-ui/components/common/elements/icons/Brand';

import Menu from './menu';
import Search from './search';
import WalletButton from './wallet';
// import Utility from './utility';

import { HeaderWrapper } from './style';

class NavBar extends React.Component {
  componentWillMount = () => {
    this.fixScrollbar(this.props);
  };
  componentWillReceiveProps = nextProps => {
    this.fixScrollbar(nextProps);
  };

  fixScrollbar = props => {
    const { showWallet } = props;
    if (showWallet && showWallet.show) {
      document.body.classList.toggle('modal-is-open');
    } else {
      document.body.classList.remove('modal-is-open');
    }
  };
  render() {
    const { history } = this.props;
    return (
      <HeaderWrapper>
        <Menu />
        <Search />
        <WalletButton onWalletClick={() => this.props.showHideWalletOverlay(true)} />
        {/* <Utility history={history} /> */}
        <Brand />
      </HeaderWrapper>
    );
  }
}

const { func, object } = PropTypes;

NavBar.propTypes = {
  showHideWalletOverlay: func.isRequired,
  history: object,
};

NavBar.defaultProps = {
  history: undefined,
};

export default connect(
  ({ govUI: { ShowWallet } }) => ({ showWallet: ShowWallet }),
  {
    showHideWalletOverlay,
  }
)(NavBar);
