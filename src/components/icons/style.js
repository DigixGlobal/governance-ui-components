import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  width: ${props => props.width};
  height: ${props => props.height};

  > svg {
    color: ${props => props.color};
    fill: ${props => props.color};
    width: 100%;
    height: 100%;
  }
`;
