import React from 'react';
import { connect } from 'react-redux';

import Brand from '@digix/gov-ui/components/common/elements/icons/Brand';
import Menu from '@digix/gov-ui/components/common/blocks/navbar/menu';
import Search from '@digix/gov-ui/components/common/blocks/navbar/search';
import WalletButton from '@digix/gov-ui/components/common/blocks/navbar/wallet';
import { HeaderWrapper } from '@digix/gov-ui/components/common/blocks/navbar/style';

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
        <WalletButton />
        <Brand />
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = ({ govUI: { ShowWallet } }) => ({
  showWallet: ShowWallet,
});

export default connect(
  mapStateToProps,
  {}
)(NavBar);
