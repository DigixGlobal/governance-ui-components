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
  light: darkBlueHex.lighten(1),
  lighter: darkBlueHex.lighten(1.5),
  lightest: darkBlueHex.lighten(2),
  fade: darkBlueHex.fade(0.85),
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
  fade: darkGoldHex.fade(0.8),
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
  light: darkGrayHex.lighten(1),
  lighter: darkGrayHex.lighten(1.9),
  lightest: darkGrayHex.lighten(2.075),
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
  light: redHex.lighten(0.5),
  lighter: redHex.lighten(0.8),
  lightest: redHex.lighten(1.9),
  fade: redHex.fade(0.9),
};

const greenHex = Color('#417505');
const green = {
  default: greenHex,
  darker: greenHex.darken(2),

  light: greenHex.lighten(0.5),
  lighter: greenHex.lighten(1),
  lightest: greenHex.lighten(1.9),
  fade: greenHex.fade(0.8),
};

const primaryColor = darkBlue;
const secondaryColor = darkGold;
const tertiaryColor = darkGray;

const boxShadowStyle = '0 4px 8px 0 rgba(231, 233, 236, 0.8), 0 2px 4px 0 rgba(231, 233, 236, 0.6)';
const transitionStyle = 'all .25s ease';
const borderRadiusStyle = '0.25rem';

const LightTheme = {
  backgroundDefault: white,
  backgroundPrimary: primaryColor,
  backgroundSecondary: secondaryColor,
  backgroundTertiary: tertiaryColor,
  backgroundLeftPanel: white,
  backgroundHeader: white,

  borderColor: tertiaryColor,
  borderColorPrimary: primaryColor,
  borderColorSecondary: secondaryColor,

  boxShadow: boxShadowStyle,
  borderRadius: borderRadiusStyle,

  buttonBgPrimary: white,
  buttonBgHoverPrimary: primaryColor,
  buttonBgSecondary: primaryColor,
  buttonBgHoverSecondary: primaryColor,
  buttonBgTertiary: white,
  buttonBgTertiaryReverse: secondaryColor,
  buttonBorderPrimary: primaryColor,
  buttonBorderSecondary: secondaryColor,
  buttonBorderTertiary: secondaryColor,
  buttonBorderDisabled: darkGray,
  buttonResponseYes: green,
  buttonResponseNo: red,
  buttonFlatColor: red,
  buttonTextDefault: tertiaryColor,
  buttonTextDefaultReverse: white,
  buttonTextPrimary: primaryColor,
  buttonTextPrimaryReverse: white,
  buttonTextSecondary: secondaryColor,
  buttonTextSecondaryReverse: white.default,
  buttonTextTertiary: white,
  buttonTextTertiaryReverse: secondaryColor,

  headerBorderColor: gray.default,

  errorBorder: red.default,

  iconDefaultColor: tertiaryColor,
  iconPrimaryColor: primaryColor,
  iconSecondaryColor: secondaryColor,
  iconColor: tertiaryColor,
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
  textReverse: white,
  transition: transitionStyle,

  cardBorderColor: tertiaryColor,
  cardBorderColorHover: primaryColor,

  alertMessage: {
    success: secondaryColor,
    error: red,
    warning: primaryColor,
    info: secondaryColor,

    response: green,
  },

  transaction: {
    pending: tertiaryColor,
    success: green,
    failed: red,
  },

  icon: {
    default: primaryColor,
    active: secondaryColor,
    primary: tertiaryColor,
    disabled: tertiaryColor,
  },
};

export default LightTheme;
