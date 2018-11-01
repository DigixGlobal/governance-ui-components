import styled from 'styled-components';
import { H4 } from '../../common-styles';
import { SyledInput } from '../../elements/textfield/style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  z-index: 100;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
export const CloseButtonWithHeader = styled.div`
  display: flex;

  justify-content: space-between;
`;

export const TransparentOverlay = styled.div`
  background-color: #000;
  opacity: 0.75;
  width: 75%;
  transition: ${props => props.theme.transition};
`;

export const WalletContainer = styled.div`
  background-color: ${props => props.theme.backgroundDefault.default.toString()};
  padding: 3rem;

  width: 25%;
`;

export const InnerContainer = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  transition: ${props => props.theme.transition};
`;

export const Header = styled(H4)`
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`;

export const LockDgdBox = styled.div`
  text-align: center;
  background-color: rgba(226, 206, 152, 0.2);
  padding: 1.5rem 2.5rem;
  border: 1px solid #c4a159;
  color: #c4a159;
  margin-bottom: 4rem;
  font-family: 'Futura PT Medium';
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const InputDgxBox = styled.div`
  display: flex;
  text-align: center;
  border: 1px solid ${props => props.theme.backgroundPrimary.default.toString()};
  border-radius: 0.5rem;
  align-items: center;
  padding-right: 1rem;
  font-size: 2rem;
  box-shadow: ${props => props.theme.boxShadow};
  ${SyledInput} {
    height: 5rem;
    font-size: 3rem;
    border: none;
  }
`;

export const TextCaption = styled.p`
  font-family: 'Futura PT Medium';
`;

export const StakeCaption = styled.p`
  margin-top: 0.5rem;
  color: ${props => props.theme.textDefault.default.toString()};
`;
