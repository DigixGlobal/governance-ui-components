import styled from 'styled-components';
import { Card } from '../../common-styles';

export const SnackbarContainer = styled.div`
  ${Card};
  justify-content: space-between;
  background-color: ${props => props.theme.backgroundPrimary.default.toString()};
  padding: 0 3rem;
  position: fixed;
  bottom: 0;
  left: 5%;
  right: 5%;
  width: 90%;
  margin-bottom: 5rem;
`;
export const SnackbarDesc = styled.div`
  color: ${props => props.theme.textReverse.default.toString()};
  padding: 3rem 0;
`;
export const SnackbarAction = styled.a`
  color: ${props => props.theme.textSecondary.default.toString()};
  font-family: 'Futura PT Medium';
  padding: 3rem 0;
`;
