import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContentWrapper = styled.div`
  background-color: ${props => props.theme.backgroundTertiary.lighter.toString()};
  flex: 5 0 0;
  padding: 12em;
  margin-left: 15%;
`;

export const TosOverlay = styled.div`
  max-height: 50vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.05);
  padding: 1em;
`;
