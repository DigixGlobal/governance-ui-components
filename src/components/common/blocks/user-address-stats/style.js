import styled, { css } from 'styled-components';
import { Card } from '@digix/gov-ui/components/common/common-styles';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const Stats = styled(Card)`
  text-transform: uppercase;
  padding: 0;
  background-color: ${props => props.theme.backgroundTertiary.lightest.toString()};
  box-shadow: none;
  ${props =>
    props.dashboard &&
    css`
      margin-bottom: 8rem;
    `};

  ${media.mobile`
    padding: 3rem 3rem;
    flex-direction: column;
  `};
`;

export const Item = styled.div`
  border-right: 1px solid ${props => props.theme.cardBorderColor.lighter.toString()};
  display: inline-block;
  padding: 3rem 5rem 2.5rem 5rem;
  flex: 1;

  :last-child {
    border-right: none;
  }

  ${media.mobile`
    border-right: none;
    margin-bottom: 2rem;
    padding: 0 0 1rem 0;
    
    &:last-child {
      margin-bottom: 0;
    }
  `};
`;

export const Data = styled.div`
  display: flex;
  text-transform: none;
  justify-content: flex-start;
  align-items: flex-end;
  font-family: 'Futura PT Medium';
  font-size: 2.5rem;
  text-align: left;
  margin-bottom: 0.5em;

  span {
    &.equiv {
      font-family: 'Futura PT Light', sans-serif;
      font-size: 1.2em;
      color: ${props => props.theme.textColor.default.base.toString()};
      margin-left: 1rem;
      margin-bottom: 0.75rem;

      ${media.tablet`
        margin-left: 0;
      `};
      ${media.mobile`
        margin-left: 1rem;
      `};
    }
    &.small-info {
      font-family: 'Futura PT Light', sans-serif;
      font-size: 0.75em;
      margin-bottom: 0.2em;
      margin-left: 0.5em;
      color: ${props => props.theme.textColor.default.base.toString()};
    }
  }

  ${media.tablet`
      flex-direction: column;
      align-items: flex-start;
      margin-top: 0;
  `};

  ${media.mobile`
  flex-direction: row;
  `};
`;
