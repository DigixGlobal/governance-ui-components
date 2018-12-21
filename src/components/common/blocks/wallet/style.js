import styled from 'styled-components';
import { H4 } from '../../common-styles';
import { Container as IconContainer } from '../../../common/elements/icons/style';

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
  justify-content: flex-end;
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
  padding: 5rem;

  width: 25%;
`;

export const InnerContainer = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  transition: ${props => props.theme.transition};
`;

export const IntroContainer = styled(InnerContainer)`
  font-size: 1.6rem;
`;

export const Header = styled(H4)`
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'none')};
`;

// export const ActionContainer = styled.ul`
//   list-style: none;
// `;

// export const WalletItem = styled.li`
//   font-family: 'Futura PT Medium';
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   :hover {
//     ${IconContainer} {
//       > svg {
//         fill: #fff;
//       }
//     }
//   }
// `;

export const ActionContainer = styled.div`
  margin: 1rem auto;
`;
