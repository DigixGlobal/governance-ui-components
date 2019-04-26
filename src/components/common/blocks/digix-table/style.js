import styled, { css } from 'styled-components';
import { Button } from '@digix/gov-ui/components/common/elements/index';

const ButtonStyles = css`
  background: ${props => props.theme.background.white.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: none;
  font-size: 1.2rem;
  margin: 0.5rem;
  padding: 1rem;
  top: 1rem;

  div {
    margin-right: 0;
    width: 1.75rem;
    height: 1.75rem;
  }

  &:hover {
    background: ${props => props.theme.background.white.toString()};
    border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  }
`;

export const Next = styled(Button)`
  ${ButtonStyles};
  right: 1rem;

  div {
    transform: rotate(275deg);
  }
`;

export const Previous = styled(Button)`
  ${ButtonStyles};
  right: 5.5rem;

  div {
    transform: rotate(90deg);
  }
`;

export const Container = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
`;

export const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
`;
