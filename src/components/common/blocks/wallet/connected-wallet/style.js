import styled from 'styled-components';

export const WalletDetails = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
`;

export const Address = styled.div`
  color: ${props => props.theme.borderColor.darker.toString()};
  text-transform: uppercase;
  font-family: 'Futura PT Book', sans-serif;
  color: ${props => props.theme.textColor.default.light.toString()};
  margin: 1rem 0;

  > span {
    color: ${props => props.theme.textColor.default.base.toString()};
    display: block;
    font-size: 1.6rem;
    margin-top: 0.5rem;
    text-transform: capitalize;
  }
`;

export const Token = styled.div`
  display: flex;
  align-items: center;

  background: ${props => props.theme.card.background.base.toString()};
  border: 1px solid ${props => props.theme.card.border.lighter.toString()};
  border-radius: ${props => props.theme.borderRadius};
  padding: 2rem;
  margin: 1rem 0;
`;

export const Amount = styled.div`
  font-family: 'Futura PT Medium', sans-serif;

  div {
    &:first-child {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    &:last-child {
      font-size: 1.4rem;
      font-family: 'Futura PT Book', sans-serif;
      color: ${props => props.theme.textColor.default.light.toString()};
    }
  }
  span {
  }
`;

export const Notes = styled.div`
  margin-top: 5rem;

  & > ul {
    margin-left: 1.5rem;

    li {
      margin-bottom: 0.5rem;
    }
  }
`;

export const NotesTitle = styled.p`
  text-transform: uppercase;
`;
