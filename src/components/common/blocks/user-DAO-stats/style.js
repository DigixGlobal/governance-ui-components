import styled from 'styled-components';

export const Container = styled.div`
  margin: 2em auto;
  padding: 2rem 4rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid ${props => props.theme.borderColor.default.toString()};
  max-height: 10.2rem;
  height: 10.2rem;
  box-shadow: -1rem 0.3rem 3.1rem rgba(128, 152, 213, 0.2);
`;

export const Point = styled.div`
  width: 33.33333%;
  display: inline-block;
  span {
    display: block;
    font-family: 'Futura PT Medium';
    font-size: 3.6rem;
  }

  border-right: 1px solid ${props => props.theme.borderColor.default.toString()};

  :last-child {
    border-right: none;
  }
`;
