import Color from 'color';

const blackHex = Color('#000');
const black = {
  default: blackHex,
  darker: blackHex.darken(0.05),
  lighter: blackHex.lighten(0.05),
  raw: blackHex,
};

const blueHex = Color('#243961');

const blue = {
  default: blueHex,
  darker: blueHex.darken(1),
  lighter: blueHex.lighten(0.1),
  raw: blueHex,
};

const goldHex = Color('#E4C88E');

const gold = {
  default: goldHex,
  darker: goldHex.darken(0.05),
  lighter: goldHex.lighten(0.05),
  raw: goldHex,
};

const grayHex = Color('#fcfcfc');

const gray = {
  default: grayHex,
  darker: grayHex.darken(0.05),
  lighter: grayHex.lighten(0.05),
  raw: grayHex,
};

const ErrorMessage = {
  backgroundColor: gray,
  padding: '1em',
};

const LightTheme = {
  backgroundColor: gray,
  mainBackgroundColor: gold.default,
  headerBackgroundColor: gray.default,
  sidePanelBgColor: gray.default,

  timelineBgColor: gold.lighter,
  timelineCurrentBgColor: gold.darker,
  primary: blue,
  secondary: gold,
  textColor: black,
  borderColor: gray,

  ErrorMessage,
};

export default LightTheme;
