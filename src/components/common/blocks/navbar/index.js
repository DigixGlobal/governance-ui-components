import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { showHideWalletOverlay } from '../../../../reducers/gov-ui/actions';

import Menu from './menu';
import Search from './search';
import WalletButton from './wallet';
import Utility from './utility';
import Brand from '../../elements/icons/Brand';

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
    return (
      <HeaderWrapper>
        <Menu />
        <Search />
        <WalletButton onWalletClick={() => this.props.showHideWalletOverlay(true)} />
        <Utility />
        <Brand />
      </HeaderWrapper>
    );
  }
}

const { func, bool } = PropTypes;

NavBar.propTypes = {
  // onWalletClick: func.isRequired,
  showWallet: bool.isRequired,
  showHideWalletOverlay: func.isRequired,
};

export default connect(
  ({ govUI: { ShowWallet } }) => ({ showWallet: ShowWallet }),
  {
    showHideWalletOverlay,
  }
)(NavBar);
