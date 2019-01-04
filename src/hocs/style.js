import styled from 'styled-components';

export const Container = styled.div`
  background: ${props => props.theme.backgroundTertiary.lightest.toString()};

  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

export const ContentWrapper = styled.div`
  flex: 5 0 0;
  padding: 12em 8em;
  margin-left: 280px;
  // max-width: 1600px;
`;
