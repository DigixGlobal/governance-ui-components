import Color from 'color';

const blackHex = Color('#000');
const black = {
  default: blackHex,
  darker: blackHex.darken(0.5),
  lighter: blackHex.lighten(0.5),
};

const blueHex = Color('#243961');
const blue = {
  default: blueHex,
  darker: blueHex.darken(1),
  lighter: blueHex.lighten(0.1),
};

const darkBlueHex = Color('#464E5B');
const darkBlue = {
  default: darkBlueHex,
  darker: darkBlueHex.darken(1),
  lighter: darkBlueHex.lighten(0.1),
};

const goldHex = Color('#E4C88E');
const gold = {
  default: goldHex,
  darker: goldHex.darken(0.05),
  lighter: goldHex.lighten(0.05),
};

const grayHex = Color('#E8ECF2');
const gray = {
  default: grayHex,
  darker: grayHex.darken(0.1),
  lighter: grayHex.lighten(0.08),
};

// const darkerGrayHex = Color('#E3E3E3');
// const darkerGray = {
//   default: darkerGrayHex,
//   darker: darkerGrayHex.darken(0.5),
//   lighter: darkerGrayHex.lighten(0.05),
// };

const whiteHex = Color('#fff');
const white = {
  default: whiteHex,
  darker: whiteHex.darken(0.05),
  lighter: whiteHex.lighten(0.05),
};

const redHex = Color('#D0021B');
const red = {
  default: redHex,
  darker: redHex.darken(0.05),
  lighter: redHex.lighten(0.05),
};

const ErrorMessage = {
  backgroundColor: gray,
  padding: '1em',
};

const LightTheme = {
  primary: blue,
  secondary: gold,

  backgroundColor: gray,
  mainBackgroundColor: gray.lighter,

  headerBackgroundColor: white.default,
  headerBorderColor: gray.default,

  sidePanelBgColor: gray,

  timelineBgColor: gold.lighter,
  timelineCurrentBgColor: gold.darker,

  textColor: black,
  defaultTextColor: darkBlue.default,
  textColorInverted: white,
  borderColor: gray,

  iconColor: blue.default,
  tagColor: red.default,

  ErrorMessage,
};

export default LightTheme;
