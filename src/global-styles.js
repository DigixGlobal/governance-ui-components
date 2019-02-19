import { injectGlobal, css } from 'styled-components';

import FuturaPTBook from './assets/fonts/FuturaPTBook.otf';
import FuturaPTExtraBold from './assets/fonts/FuturaPTExtraBold.otf';
import FuturaPTHeavy from './assets/fonts/FuturaPTHeavy.otf';
import FuturaLight from './assets/fonts/FuturaPTLight.otf';
import FuturaPTMedium from './assets/fonts/FuturaPTMedium.otf';

injectGlobal`

@font-face {
  font-family: 'Futura PT Light';
  src: url(${FuturaLight}) format('opentype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Futura PT Book';
  src: url(${FuturaPTBook}) format('opentype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Futura PT Extra Bold';
  src: url(${FuturaPTExtraBold}) format('opentype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Futura PT Heavy';
  src: url(${FuturaPTHeavy}) format('opentype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'Futura PT Medium';
  src: url(${FuturaPTMedium}) format('opentype');
  font-weight: normal;
  font-style: normal;
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%; }

body.modal-is-open {
    overflow: hidden;
  }

body {

  font-family: 'Futura PT Book', 'Roboto', 'Arial', 'sans-serif';
  font-size: 1.4rem;
  // letter-spacing: 0.05em;
  box-sizing: border-box;
  color: #464E5B;
}

input {
  font-family: 'Futura PT Book', 'Roboto', 'Arial', 'sans-serif';
  outline: none;
}

a {
  cursor: pointer;
  text-decoration: none;
  &:hover, &:visited:hover {
    text-decoration: none;
  }
}

p {
  margin-bottom: 1em;
  font-weight: 300;
}

`;

const breakpoints = {
  // Numerical values will result in a max-width query
  xxsmall: 390,
  xsmall: 480,
  small: 640,
  medium: 832,
  large: 1024,
  xlarge: 1440,
};

export const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  const prefix = typeof breakpoints[label] === 'string' ? '' : 'max-width:';
  const suffix = typeof breakpoints[label] === 'string' ? '' : 'px';
  // eslint-disable-next-line
  accumulator[label] = cls =>
    css`
      @media (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }
    `;
  return accumulator;
}, {});
