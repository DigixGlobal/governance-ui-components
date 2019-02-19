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
  color: ${props => props.theme.textSecondary.default.toString()};
  background-color: ${props => props.theme.backgroundSecondary.fade.toString()};
  border: 1px solid ${props => props.theme.backgroundSecondary.light.toString()};
  border-radius: ${props => props.theme.borderRadius};
  font-family: 'Futura PT Medium';
  margin-bottom: 4rem;
  padding: 2.5rem;
  text-align: center;
`;

export const ConfirmationBox = styled.div`
  font-family: 'Futura PT Book';
  background-color: ${props => props.theme.backgroundSecondary.fade.toString()};
  border: 1px solid ${props => props.theme.backgroundSecondary.light.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  margin-bottom: 4rem;
  padding: 2.5rem;
  text-align: center;

  > h2 {
    color: #c4a159;
  }
  > div {
    margin: 2rem;
  }
  > div > a {
    color: #c4a159;
  }
`;

export const InputDgxBox = styled.div`
  display: flex;
  text-align: center;
  border: 1px solid ${props => props.theme.backgroundPrimary.default.toString()};
  border-radius: ${props => props.theme.borderRadius};
  align-items: center;
  padding-right: 1rem;
  font-size: 2rem;
  box-shadow: ${props => props.theme.boxShadow};
  ${SyledInput} {
    height: 5rem;
    font-size: 2rem;
    border: none;
    font-family: 'Futura PT Book';
    &:focus {
      box-shadow: none;
      border-color: #fff;
    }
  }
`;

export const TextCaption = styled.p`
  font-family: 'Futura PT Medium';
`;

export const StakeCaption = styled.p`
  margin-top: 0.5rem;
  color: ${props => props.theme.textDefault.default.toString()};
`;

export const ErrorCaption = styled.div`
  text-align: center;
  background-color: rgba(208, 2, 27, 0.2);
  padding: 1.5rem 2.5rem;
  border: 1px solid #d0021b;
  color: #d0021b;
  margin-bottom: 4rem;
  font-family: 'Futura PT Medium';
  border-radius: 0.5rem;
  box-shadow: ${props => props.theme.boxShadow};
`;

export const Note = styled.span`
  margin: 2rem;
`;
