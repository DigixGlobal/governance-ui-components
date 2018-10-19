import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.theme.defaultBgColor.default.toString()};
  margin-bottom: 4rem;
  padding: 2rem 4rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
  max-height: 10.2rem;
  height: 10.2rem;
  box-shadow: 0 4px 8px 0 rgba(231, 233, 236, 0.8), 0 2px 4px 0 rgba(231, 233, 236, 0.6);
`;

export const Point = styled.div`
  width: 33.33333%;
  display: inline-block;
  span {
    display: block;
    font-family: 'Futura PT Medium';
    font-size: 3.6rem;
  }

  border-right: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};

  :last-child {
    border-right: none;
  }
`;
