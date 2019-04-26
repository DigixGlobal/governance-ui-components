import styled, { css, keyframes } from 'styled-components';
import { Button, Icon } from '@digix/gov-ui/components/common/elements/index';
import { media } from '@digix/gov-ui/components/common/breakpoints';

export const Preloaders = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: ${props => props.height || '100vh'};

  z-index: 1001;
  background: #fff;

  top: 0;
  left: 0;
  overflow: hidden;
`;

export const Digix = styled(Icon)`
  svg {
    height: 65px;
  }

  margin-bottom: 4rem;
`;

const LOADING = keyframes`
0% {
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
100% {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
}
`;

const PULSE = keyframes`
0%    { background-color: rgba(165, 165, 165, 0.15) }
50%   { background-color: rgba(165, 165, 165, 0.20) }
100%  { background-color: rgba(165, 165, 165, 0.10) }
`;

export const LoaderWrapper = styled.div`
  padding: 15rem;
  margin-top: 15rem;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0 auto;
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);

  ${media.tablet`
    min-height: 300px;
  `};
`;

export const CountdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  margin: 0 auto;
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(255, 255, 255, 0.5);
`;

export const Content = styled.div`
  text-align: center;

  ${props =>
    props.countdown &&
    css`
      max-width: 1200px;
    `};

  h1 {
    font-family: 'Futura PT Heavy', sans-serif;
    font-size: 4.8rem;
    margin-bottom: 1.5rem;

    span {
      color: ${props => props.theme.textColor.primary.light.toString()};
    }
  }

  h2 {
    color: ${props => props.theme.textColor.default.base.toString()};
    font-family: 'Futura PT Light', sans-serif;
    font-size: 2.6rem;
    font-weight: normal;
    margin: 2rem 8rem;
  }

  p {
    font-family: 'Futura PT Light', sans-serif;
    font-size: 2rem;
    letter-spacing: 0.025rem;
  }
`;

export const TimerContainer = styled.div`
  margin-top: 8rem;
  text-transform: uppercase;
  width: 820px;
`;

export const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem 0 6rem 0;
  border-left: 3px solid ${props => props.theme.borderColorPrimary.lighter.toString()};
  border-right: 3px solid ${props => props.theme.borderColorPrimary.lighter.toString()};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
      color: ${props => props.theme.textColor.default.base.toString()};
      font-size: 2rem;
      font-family: 'Futura PT Book', sans-serif;
      text-transform: capitalize;
      margin-top: -0.5rem;

      &:first-child {
        color: ${props => props.theme.textColor.primary.light.toString()};
        font-family: 'Futura PT Heavy', sans-serif;
        font-size: 8rem;
        width: 120px;
        text-align: center;
      }
    }
  }
`;
export const Label = styled.div`
  display: flex;

  font-size: 1.8rem;
  font-weight: normal;

  div {
    flex: 1;

    display: flex;
    align-items: center;
    border-bottom: 3px solid ${props => props.theme.borderColorPrimary.lighter.toString()};

    &:nth-of-type(2) {
      flex: 0 0 auto;
      font-family: 'Futura PT Heavy', sans-serif;
      border-bottom: 0;
      margin: 0 2rem -1rem 2rem;
      letter-spacing: 0.05rem;
      color: ${props => props.theme.textColor.primary.light.toString()};
    }
  }

  span {
    font-size: 3rem;
    line-height: 1rem;
    margin: 0 0.75rem;
  }
`;
export const Cta = styled.div`
  border-top: 3px solid ${props => props.theme.borderColorPrimary.lighter.toString()};

  display: flex;
  justify-content: center;
`;

export const ParticipateButton = styled(Button)`
  margin-top: -2.5rem;
  font-size: 1.4rem;
  font-family: 'Futura PT Book', sans-serif;
  letter-spacing: 0.05rem;
  padding: 1.5rem 2.5rem;

  background: ${props => props.theme.buttonPrimary.background.base.toString()};
  border-color: ${props => props.theme.buttonPrimary.border.base.toString()};
  color: ${props => props.theme.buttonPrimary.textColor.base.toString()};
  border-radius: 0;

  &:hover {
    background: ${props => props.theme.buttonPrimary.background.light.toString()};
    border-color: ${props => props.theme.buttonPrimary.border.light.toString()};
  }
`;

export const Divider = styled.div`
  border-right: 1px solid ${props => props.theme.borderColor.light.toString()};
  width: 1px;
  height: 30px;
  margin: 1rem 3rem;
`;

export const Loader = styled.div`
  color: ${props => props.theme.background.primary.lighter.toString()};
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  border-radius: 50%;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);

  &:before,
  &:after {
    border-radius: 50%;
    position: absolute;
    content: '';
  }

  &:before {
    width: 5.2em;
    height: 10.2em;
    background: #fff;
    border-radius: 10.2em 0 0 10.2em;
    top: -0.1em;
    left: -0.1em;
    -webkit-transform-origin: 5.2em 5.1em;
    transform-origin: 5.2em 5.1em;
    -webkit-animation: ${LOADING} 2s infinite ease 1.5s;
    animation: ${LOADING} 2s infinite ease 1.5s;
  }
  &:after {
    width: 5.2em;
    height: 10.2em;
    background: #fff;
    border-radius: 0 10.2em 10.2em 0;
    top: -0.1em;
    left: 5.1em;
    -webkit-transform-origin: 0px 5.1em;
    transform-origin: 0px 5.1em;
    -webkit-animation: ${LOADING} 2s infinite ease;
    animation: ${LOADING} 2s infinite ease;
  }
`;

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;
  margin: 1rem;
  margin-bottom: 5rem;

  ${props =>
    props.card &&
    css`
      background: rgba(165, 165, 165, 0.05);
      padding: 4rem;
    `}
`;

export const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 10px;

  ${props =>
    props.card &&
    css`
      background: rgba(165, 165, 165, 0.05);
      padding: ${props.nospace ? '0' : '3.5rem'};
      margin: 1px;
    `}

  ${props =>
    props.loading &&
    css`
      animation: ${PULSE} 1100ms infinite ease-in-out;
      height: ${props.large ? '10px' : '6px'};
    `}

  ${props =>
    props.col12 &&
    css`
      grid-column: span 12;
    `};

    ${props =>
      props.col10 &&
      css`
        grid-column: span 10;
      `};

    ${props =>
      props.col8 &&
      css`
        grid-column: span 8;
      `};

    ${props =>
      props.col6 &&
      css`
        grid-column: span 6;
      `};

    ${props =>
      props.col5 &&
      css`
        grid-column: span 5;
      `};

  ${props =>
    props.col4 &&
    css`
      grid-column: span 4;
    `};

  ${props =>
    props.col3 &&
    css`
      grid-column: span 3;
    `};

  ${props =>
    props.col2 &&
    css`
      grid-column: span 2;
    `};
`;
