import styled from 'styled-components';

export const Container = styled.div`
background: ${props => props.theme.mainBackgroundColor.toString()};
display: flex;
flex-direction: row;
  
  // width: ${props => props.width || '25%'};
`;
