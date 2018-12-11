import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.backgroundTertiary.lighter.toString()};
  flex: 5 0 0;
  padding: 8em 10em;
  margin-left: 15%;
`;
