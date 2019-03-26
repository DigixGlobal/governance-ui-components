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
  width: calc(100% - 480px);
  transition: ${props => props.theme.transition};
`;

export const WalletContainer = styled.div`
  background-color: ${props => props.theme.backgroundDefault.default.toString()};
  padding: 3rem;
  width: 480px;
  max-width: 480px;
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

export const LockDGD = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${props => props.theme.backgroundPrimary.default.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 1rem 3rem 1rem 2rem;
  font-size: 2rem;
  font-family: 'Futura PT Medium', sans-serif;

  ${SyledInput} {
    height: 5rem;
    font-family: 'Futura PT Medium', sans-serif;
    font-size: 2rem;
    border: none;

    &:focus {
      box-shadow: none;
      border-color: #fff;
    }
  }

  div {
    flex: 1;
  }

  span {
    flex: 0 0 auto;
  }
`;

export const Label = styled.p`
  font-family: 'Futura PT Medium', sans-serif;
  font-size: 1.6rem;
`;

export const FormNote = styled.div`
  margin-top: 2rem;
  color: ${props => props.theme.textColor.default.light.toString()};
  font-size: 1.6rem;
`;
