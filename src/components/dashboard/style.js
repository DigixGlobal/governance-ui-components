import styled from 'styled-components';

export const DashBoardContainer = styled.div`
  text-align: center;
  /* font-weight: bold; */

  color: ${props => props.theme.textDefault.default.toString()};
`;

export const DashBoardItem = styled.div`
  padding: 4rem;
  text-align: center;
  display: inline-block;
  text-transform: uppercase;
  border: 1px solid ${props => props.theme.backgroundSecondary.default.toString()};
`;

export const Count = styled.div`
  font-family: 'Futura PT Medium';
  font-size: 4rem;
  padding-bottom: 2rem;
`;

export const Label = styled.div`
  font-size: 2rem;
`;
