import styled from 'styled-components';

export const Container = styled.div`
  display: inline-block;
  width: ${props => props.width || '3rem'};
  height: ${props => props.height || '3rem'};

  :hover {
    border-radius: 50%;
    background-color: #284b82;
    transition: background-color 0.4s ease;
  }
  > svg {
    color: ${props => props.color};
    fill: ${props => props.color};
    /* display: inline-block; */
    padding: 0.5rem;

    width: 100%;
    height: 100%;
  }
`;
