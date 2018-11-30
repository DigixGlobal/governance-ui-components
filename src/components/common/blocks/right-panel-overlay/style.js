import styled from 'styled-components';
// import { H4 } from '../../common-styles';
// import { Container as IconContainer } from '../../../common/elements/icons/style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  z-index: 100;
`;

export const TransparentOverlay = styled.div`
  background-color: #000;
  opacity: 0.75;
  width: 75%;
  transition: ${props => props.theme.transition};
`;

export const PanelContainer = styled.div`
  background-color: ${props => props.theme.backgroundDefault.default.toString()};
  padding: 5rem;

  width: 25%;
`;

export const CloseButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
