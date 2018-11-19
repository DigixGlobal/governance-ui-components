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
  light: blueHex.lighten(0.5),
  lighter: blueHex.lighten(0.75),
  lightest: blueHex.lighten(1.9),
};

const darkBlueHex = Color('#131F35');
const darkBlue = {
  default: darkBlueHex,
  darker: darkBlueHex.darken(1),
  light: darkBlueHex.lighten(0.5),
  lighter: darkBlueHex.lighten(0.75),
  lightest: darkBlueHex.lighten(1.9),
};

const goldHex = Color('#E3C88E');
const gold = {
  default: goldHex,
  darker: goldHex.darken(0.05),
  light: goldHex.lighten(0.5),
  lighter: goldHex.lighten(1),
  lightest: goldHex.lighten(1.9),
};

const darkGoldHex = Color('#C2A059');
const darkGold = {
  default: darkGoldHex,
  darker: darkGoldHex.darken(0.05),
  light: darkGoldHex.lighten(0.5),
  lighter: darkGoldHex.lighten(1),
  lightest: darkGoldHex.lighten(1.9),
};

const grayHex = Color('#E8ECF2');
const gray = {
  default: grayHex,
  darker: grayHex.darken(0.1),
  light: grayHex.lighten(0.075),
  lighter: goldHex.lighten(0.05),
  lightest: goldHex.lighten(0.075),
};

const darkGrayHex = Color('#464E5B');
const darkGray = {
  default: darkGrayHex,
  darker: darkGrayHex.darken(0.5),
  light: darkGrayHex.lighten(0.25),
  lighter: darkGrayHex.lighten(1),
  lightest: darkGrayHex.lighten(2.1),
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
  lighter: redHex.lighten(0.5),
};

const primaryColor = darkBlue;
const secondaryColor = darkGold;
const tertiaryColor = darkGray;

const boxShadowStyle = '0 4px 8px 0 rgba(231, 233, 236, 0.8), 0 2px 4px 0 rgba(231, 233, 236, 0.6)';
const transitionStyle = 'all 300ms ease';

const LightTheme = {
  backgroundDefault: white,
  backgroundPrimary: primaryColor,
  backgroundSecondary: secondaryColor,
  backgroundLayout: tertiaryColor,
  backgroundLeftPanel: white,
  backgroundHeader: white,

  borderColor: tertiaryColor,

  boxShadow: boxShadowStyle,

  buttonBgPrimary: primaryColor.default,
  buttonBgSecondary: secondaryColor.default,
  buttonBorderPrimary: primaryColor.default,
  buttonBorderSecondary: secondaryColor.default,
  buttonBorderDisabled: darkGray.lightest,
  buttonFlatColor: red.default,
  buttonTextDefault: tertiaryColor.default,
  buttonTextPrimary: primaryColor.default,
  buttonTextPrimaryReverse: white.default,
  buttonTextSecondary: secondaryColor.default,
  buttonTextSecondaryReverse: white.default,

  headerBorderColor: gray.default,

  iconDefaultColor: tertiaryColor,
  iconPrimaryColor: primaryColor,
  iconSecondaryColor: secondaryColor,
  iconColor: primaryColor.default,
  iconColorReverse: white,

  linkDefaultColor: tertiaryColor,
  linkPrimaryColor: primaryColor,
  linkSecondaryColor: secondaryColor,

  filterActive: secondaryColor.default,
  filterCount: tertiaryColor,

  timelineBgColor: tertiaryColor,
  timelineCurrentBgColor: primaryColor,

  textWhite: white,
  textBlack: black,
  textDefault: tertiaryColor,
  textPrimary: primaryColor,
  textSecondary: secondaryColor,
  textContrast: white,
  transition: transitionStyle,

  cardBorderColor: tertiaryColor,

  ErrorMessage: {
    backgroundColor: gray,
    padding: '1em',
  },
};

export default LightTheme;
