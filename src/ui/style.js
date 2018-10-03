import styled from 'styled-components';

export const Container = styled.div`
background: ${props => props.theme.mainBackgroundColor.toString()}
  margin: 1rem;
  clear: both;
  width: ${props => props.width || '25%'};
`;
