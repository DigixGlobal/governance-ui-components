import Color from 'color';

const blackHex = Color('#000');
const black = {
  default: blackHex,
  darker: blackHex.darken(0.05),
  lighter: blackHex.lighten(0.05),
};

const blueHex = Color('#243961');

const blue = {
  default: blueHex,
  darker: blueHex.darken(1),
  lighter: blueHex.lighten(0.1),
};

const goldHex = Color('#E4C88E');

const gold = {
  default: goldHex,
  darker: goldHex.darken(0.05),
  lighter: goldHex.lighten(0.05),
};

const grayHex = Color('#fcfcfc');

const gray = {
  default: grayHex,
  darker: grayHex.darken(0.5),
  lighter: grayHex.lighten(0.05),
};

const whiteHex = Color('#fff');

const white = {
  default: whiteHex,
  darker: whiteHex.darken(0.05),
  lighter: whiteHex.lighten(0.05),
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
  textColorInverted: white,
  borderColor: gray,

  ErrorMessage,
};

export default LightTheme;
