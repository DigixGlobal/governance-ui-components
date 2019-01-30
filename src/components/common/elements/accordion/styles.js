import styled from 'styled-components';
// import { H3 } from '../../common-styles';
// import { EDEADLK } from 'constants';

export const AccordionItem = styled.div`
  position: relative;
  padding: 2rem 3rem;
  margin: 1rem 0;
  background: ${props =>
    props.isOpen
      ? props.theme.backgroundDefault.default.toString()
      : props.theme.backgroundDefault.default.toString()};
  border: 1px solid ${props => props.theme.borderColor.lighter.toString()};
  box-shadow: ${props => props.theme.boxShadow};
  animation: flipdown 0.5s ease both;

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
`;

export const Title = styled.div`
  margin-bottom: 0;
  font-size: 1.8rem;
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
  margin-top: 2rem;
  transition: all 0.25s ease-in-out;
`;
