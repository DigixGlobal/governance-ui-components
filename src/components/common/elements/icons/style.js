import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.width || '3rem'};
  height: ${props => props.height || '3rem'};

  /* :hover {
    border-radius: 50%;
    background-color: #284b82;
    transition: background-color 0.4s ease;
  } */
  > svg {
    color: ${props =>
      props.selected ? props.theme.secondary.default.toString() : props.theme.iconColor.toString()};
    fill: ${props =>
      props.selected ? props.theme.secondary.default.toString() : props.theme.iconColor.toString()};
    stroke: ${props =>
      props.selected ? props.theme.secondary.default.toString() : props.theme.iconColor.toString()};

    width: 100%;
    height: 100%;
  }
`;
