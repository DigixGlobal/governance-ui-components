import { Button } from '@digix/gov-ui/components/common/elements';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card } from '../../common-styles';

export const SnackbarContainer = styled(Card)`
  justify-content: flex-start;
  background-color: ${props => props.theme.backgroundPrimary.default.toString()};
  padding: 0 3rem;
  position: fixed;
  bottom: 0;
  left: 5%;

  width: 60%;
  margin-bottom: 5rem;
  z-index: 1110;
`;

export const SnackbarDesc = styled.div`
  color: ${props => props.theme.textReverse.default.toString()};
  padding: 3rem 0;
`;

export const SnackbarLink = styled.a`
  color: ${props => props.theme.textSecondary.default.toString()};
  font-family: 'Futura PT Medium';
  padding: 3rem 0;
  position: absolute;
  right: 7rem;
  text-transform: uppercase;
`;

export const SnackbarAction = styled(Button)`
  color: ${props => props.theme.textSecondary.default.toString()};
  font-family: 'Futura PT Medium';
  padding: 3rem 0;
  position: absolute;
  right: 2rem;
  text-transform: uppercase;
`;

export const TransactionLink = styled(Link)`
  color: ${props => props.theme.textReverse.default.toString()};
  font-family: 'Futura PT Medium';
  padding: 3rem 0;
`;

export const SnackbarTag = styled(Button)`
  height: 3.5rem;
  margin-right: 1rem;
  margin-top: 2rem;
  text-transform: uppercase;
`;
