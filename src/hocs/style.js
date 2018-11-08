import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.backgroundLayout.light.toString()};
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex: 5 0 0;
  padding: 8em 10em;
  margin-left: 15%;
`;
