import styled from 'styled-components';
import { H1, FieldItem, Card } from '@digix/gov-ui/components/common/common-styles';
import { Button, Input } from '@digix/gov-ui/components/common/elements/index';

export const ForumDashboard = styled.div``;

export const Fieldset = styled(FieldItem)`
  position: relative;

  .icons-container {
    position: absolute;
    top: 2px;
    right: 0;
    overflow: hidden;
  }
`;

export const Title = styled(H1)`
  margin-bottom: 1rem;
`;

export const Search = styled(Input)``;

export const SearchResult = styled(Card)`
  margin-top: 3rem;
  padding: 1rem 4rem;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  color: ${props => props.theme.textDefault.light.toString()};
  font-family: 'Futura PT Medium', sans-serif;
  padding: 0.5rem 0;
  width: 100%;

  &:last-child {
    border-bottom: none;
  }
`;

export const Username = styled.div`
  color: ${props => props.theme.textDefault.default.toString()};
  font-size: 1.8rem;
  font-family: 'Futura PT Book', sans-serif;
`;

export const ButtonBan = styled(Button)`
  width: 120px;
`;

export const SearchButton = styled(Button)`
  box-shadow: none;
  background: transparent;

  &:hover {
    background: none;
  }
`;
