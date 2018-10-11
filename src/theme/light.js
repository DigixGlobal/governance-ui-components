import Color from 'color';

// const blackHex = Color('#000');
// const black = {
//   default: blackHex,
//   darker: blackHex.darken(0.5),
//   lighter: blackHex.lighten(0.5),
// };

const blueHex = Color('#243961');
const blue = {
  default: blueHex,
  darker: blueHex.darken(1),
  lighter: blueHex.lighten(0.1),
};

const darkBlueHex = Color('#111E36');
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

// const darkGoldHex = Color('#C4A159');
// const darkGold = {
//   default: darkGoldHex,
//   darker: darkGoldHex.darken(0.05),
//   lighter: darkGoldHex.lighten(0.05),
// };

const grayHex = Color('#E8ECF2');
const gray = {
  default: grayHex,
  darker: grayHex.darken(0.1),
  lighter: grayHex.lighten(0.08),
};

const darkGrayHex = Color('#464E5B');
const darkGray = {
  default: darkGrayHex,
  darker: darkGrayHex.darken(0.5),
  lighter: darkGrayHex.lighten(0.05),
};

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

  // textColor: black,
  defaultTextColor: darkBlue.default,
  textColorInverted: white,
  borderColor: gray,

  iconColor: blue.default,
  tagColor: red.default,
  filterActive: gold.default,
  filterCount: darkGray.default,

  ErrorMessage,
};

export default LightTheme;
