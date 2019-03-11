import styled, { css } from 'styled-components';
// import { H3 } from '../../common-styles';
// import { EDEADLK } from 'constants';

export const AccordionItem = styled.div`
  position: relative;
  padding: 2rem 3rem;
  margin: 1rem 0;
  background: ${props => props.theme.background.white.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  box-shadow: none;
  animation: flipdown 0.5s ease both;

  ${props =>
    props.voting &&
    css`
      margin: 0;
      border: 0;
      border-bottom: 1px solid ${props.theme.borderColor.lighter.toString()};
      &:last-child {
        border-bottom: 0;
      }
    `}

  &:nth-of-type(1) {
    animation-delay: 0.5s;
  }

  &:nth-of-type(2) {
    animation-delay: 0.5s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.5s;
  }

  i {
    position: absolute;
    transform: translate(-6px, 0);
    margin-top: 8px;
    right: 2rem;

    &:before,
    &:after {
      content: '';
      transition: all 0.25s ease-in-out;
      position: absolute;
      background-color: #000;
      width: 3px;
      height: 9px;
    }

    &:before {
      transform: translate(-2px, 0) rotate(135deg);
    }

    &:after {
      transform: translate(2px, 0) rotate(-135deg);
    }
  }

  p {
    transition: all 0.25s ease-in-out;
    opacity: 1;
    transform: translate(0, 0);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

export const Title = styled.div`
  margin-bottom: 0;
  font-size: 1.6rem;
  font-family: 'Futura PT Medium', sans-serif;
  color: ${props => props.theme.textColor.primary.light.toString()};
  text-transform: ${props => (props.uppercase ? 'uppercase' : 'inherit')};
`;

export const Funding = styled.div`
  display: flex;
  justify-content: flex-end;
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Amount = styled.div`
  margin-right: 3rem;
  font-size: 1.8rem;
  font-style: italic;

  span {
    color: ${props => props.theme.textSecondary.default.toString()};
  }
`;

export const Content = styled.div`
  border-top: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  padding: 4rem 4rem 3rem 4rem;
  margin: 2rem -3rem 0rem -3rem;

  transition: all 0.25s ease-in-out;
`;

export const ChevronContainer = styled.div`
  height: 18px;
  width: 18px;
`;
