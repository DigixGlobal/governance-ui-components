import styled from 'styled-components';

export const Container = styled.div`
  margin: 1rem;
  clear: both;
  width: ${props => props.width || '25%'};
`;
