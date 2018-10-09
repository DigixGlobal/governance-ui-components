import styled from 'styled-components';
import { H4 } from '../../common-styles';
import { Button } from '../../../common/elements/buttons/capsule-button/style'; //

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CloseButtonWithHeader = styled.div`
  display: flex;

  justify-content: space-between;
`;

export const TransparentOverlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  width: 80%;
`;

export const WalletContainer = styled.div`
  padding: 2rem;
  background-color: ${props => props.theme.mainBackgroundColor.toString()};
  width: 20%;
`;

export const InnerContainer = styled.div`
  color: ${props => props.theme.primary.default.toString()};
`;

export const IntroContainer = styled(InnerContainer)`
  > p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

export const Header = styled(H4)`
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`;

export const Wallets = styled.ul`
  list-style: none;
`;

export const WalletItem = styled.li`
  ${Button} {
    font-family: 'Futura PT Medium';
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
