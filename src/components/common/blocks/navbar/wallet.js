import React from 'react';
import styled from 'styled-components';

import Button from '../../elements/buttons/';

const WalletWrapper = styled.div`
  flex: 3 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 2em !important;
  //   width: 300px;
  border-left: 0 !important;
`;

class Wallet extends React.Component {
  render() {
    return (
      <WalletWrapper>
        <Button kind="capsule">0x70A0f6FD3B14ec4ea67E1…</Button>
      </WalletWrapper>
    );
  }
}

export default Wallet;
