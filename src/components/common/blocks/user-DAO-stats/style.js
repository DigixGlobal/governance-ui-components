import styled from 'styled-components';

export const Container = styled.div`
  color: ${props => props.theme.textPrimary.default.toString()};
  background-color: ${props => props.theme.backgroundDefault.default.toString()};
  margin-bottom: 4rem;
  padding: 2rem 4rem;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};
  box-shadow: ${props => props.theme.boxShadow};
`;

export const Point = styled.div`
  width: 33.33333%;
  display: inline-block;
  span {
    margin-top: 1rem;
    display: block;
    font-family: 'Futura PT Medium';
    font-size: 3.6rem;
  }

  border-right: 1px solid ${props => props.theme.cardBorderColor.lightest.toString()};

  :last-child {
    border-right: none;
  }
`;
