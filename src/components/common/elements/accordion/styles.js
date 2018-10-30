import styled from 'styled-components';
import { H3 } from '../../common-styles';

export const AccordionWrapper = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  perspective: 900;

  position: relative;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
  opacity: 1;
  transform: translate(0, 0);
`;

export const AccordionItem = styled.div`
  position: relative;
  padding: 2rem;
  margin: 5px 0;
  border: 1px solid ${props => props.theme.borderColor.lightest.toString()};
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
    margin-top: 16px;
    right: 0;

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
      transform: translate(-2px, 0) rotate(45deg);
    }

    &:after {
      transform: translate(2px, 0) rotate(-45deg);
    }
  }

  p {
    transition: all 0.25s ease-in-out;
    opacity: 1;
    transform: translate(0, 0);
  }
`;

export const Header = styled(H3)``;

export const Content = styled.div``;
