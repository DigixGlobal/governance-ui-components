import Color from 'color';

const blackHex = Color('#000');
const black = {
  default: blackHex,
  darker: blackHex.darken(0.5),
  base: blackHex,
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

const darkBlueHex = Color('#131F35'); // 131F35
const darkBlue = {
  darker: darkBlueHex.darken(1),
  default: darkBlueHex,
  base: darkBlueHex,
  light: darkBlueHex.lighten(1),
  lighter: darkBlueHex.lighten(1.5),
  lightest: darkBlueHex.lighten(2),
  fade: darkBlueHex.fade(0.85),
  fader: darkBlueHex.fade(0.9),
  grayscale: darkBlueHex.grayscale(0.75),
};

const goldHex = Color('#E3C88E');
const gold = {
  default: goldHex,
  darker: goldHex.darken(0.05),
  base: goldHex,
  light: goldHex.lighten(0.5),
  lighter: goldHex.lighten(1),
  lightest: goldHex.lighten(1.9),
};

const darkGoldHex = Color('#c09f57');
const darkGold = {
  default: darkGoldHex,
  darker: darkGoldHex.darken(0.05),
  base: darkGoldHex,
  light: darkGoldHex.lighten(0.5),
  lighter: darkGoldHex.lighten(1),
  lightest: darkGoldHex.lighten(1.9),
  fade: darkGoldHex.fade(0.85),
};

const grayHex = Color('#E8ECF2');
const gray = {
  default: grayHex,
  darker: grayHex.darken(0.1),
  base: grayHex,
  light: grayHex.lighten(0.075),
  lighter: goldHex.lighten(0.05),
  lightest: goldHex.lighten(0.075),
};

const darkGrayHex = Color('#464E5B');
const darkGray = {
  default: darkGrayHex,
  darker: darkGrayHex.darken(0.5),
  base: darkGrayHex,
  light: darkGrayHex.lighten(1),
  lighter: darkGrayHex.lighten(1.875),
  lightest: darkGrayHex.lighten(2.05),
  fade: darkGoldHex.fade(0.85),
};

const whiteHex = Color('#fff');
const white = {
  default: whiteHex,
  darker: whiteHex.darken(0.05),
  base: whiteHex,
  lighter: whiteHex.lighten(0.05),
  fade: whiteHex.fade(0.9),
};

const redHex = Color('#D0021B');
const red = {
  default: redHex,
  darker: redHex.darken(0.05),
  base: redHex,
  light: redHex.lighten(0.1),
  lighter: redHex.lighten(0.5),
  lightest: redHex.lighten(1),
  fade: redHex.fade(0.95),
};

const greenHex = Color('#417505');
const green = {
  default: greenHex,
  darker: greenHex.darken(2),
  base: greenHex,
  light: greenHex.lighten(0.5),
  lighter: greenHex.lighten(1),
  lightest: greenHex.lighten(1.9),
  fade: greenHex.fade(0.8),
};

const primaryColor = darkBlue;
const secondaryColor = darkGold;
const tertiaryColor = darkGray;
const transparent = 'transparent';

const baseFontSize = '1.6rem';
const basePaddingX = 1;
const basePaddingY = 1;
const boxShadowStyle = '0 4px 8px 0 rgba(231, 233, 236, 0.8), 0 2px 4px 0 rgba(231, 233, 236, 0.6)';
const transitionStyle = 'all .25s ease';
const borderRadiusStyle = '0.3rem';

const LightTheme = {
  fontSize: baseFontSize,

  tabMenu: {
    active: secondaryColor,
    inactive: tertiaryColor,
  },

  background: {
    default: tertiaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    white: white.base,
  },

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

  // Refactoring WIP: To be used moving forward

  buttonDefault: {
    textColor: primaryColor,
    background: white,
    border: white,
    iconColor: tertiaryColor,
    invert: {
      textColor: primaryColor,
      background: primaryColor,
      iconColor: primaryColor,
    },
  },

  buttonPrimary: {
    textColor: white,
    background: primaryColor,
    border: primaryColor,
    iconColor: white,
    invert: {
      textColor: primaryColor,
      background: primaryColor,
      border: primaryColor,
      iconColor: primaryColor,
    },
  },

  buttonSecondary: {
    textColor: primaryColor,
    background: primaryColor,
    border: primaryColor,
    iconColor: primaryColor,
    invert: {
      textColor: white,
      background: primaryColor,
    },
  },

  buttonTertiary: {
    textColor: secondaryColor,
    background: secondaryColor,
    border: secondaryColor,
    iconColor: secondaryColor,
    invert: {
      textColor: white,
      background: secondaryColor,
      border: secondaryColor,
      iconColor: white,
    },
  },

  buttonInverted: {
    textColor: primaryColor,
    background: white,
    border: primaryColor,
    iconColor: primaryColor,
  },

  buttonDisabled: {
    textColor: tertiaryColor,
    background: transparent,
    border: tertiaryColor,
    iconColor: tertiaryColor,
    color: tertiaryColor,
  },

  // Refactoring WIP: For deletion
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

  card: {
    background: white,
    border: tertiaryColor,
    textColor: tertiaryColor,
  },

  commentPost: {
    admin: red,
    background: white,
    border: tertiaryColor,
    textColor: tertiaryColor,
    icon: tertiaryColor,
  },

  headerBorderColor: gray.default,

  errorBorder: red.default,

  iconDefaultColor: tertiaryColor,
  iconPrimaryColor: primaryColor,
  iconSecondaryColor: secondaryColor,
  iconColor: tertiaryColor,
  iconColorReverse: white,

  icon: {
    default: tertiaryColor,
    active: secondaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    disabled: tertiaryColor,
  },

  link: {
    primary: primaryColor,
    secondary: secondaryColor,
    disabled: tertiaryColor,
    invert: white,
  },

  textColor: {
    black,
    default: tertiaryColor,
    primary: primaryColor,
    secondary: secondaryColor,
    white: white.base,
  },

  textHeading: primaryColor,

  linkDefaultColor: tertiaryColor,
  linkPrimaryColor: primaryColor,
  linkSecondaryColor: secondaryColor,

  filterActive: secondaryColor.default,
  filterCount: tertiaryColor,

  timelineBgColor: tertiaryColor,
  timelineCurrentBgColor: primaryColor,

  textWhite: white,
  textBlack: black,
  textError: red,
  textDefault: tertiaryColor,
  textPrimary: primaryColor,
  textSecondary: secondaryColor,
  textContrast: white,
  textReverse: white,
  transition: transitionStyle,

  cardBorderColor: tertiaryColor,
  cardBorderColorHover: primaryColor,
  cardPaddingX: basePaddingX * 3,
  cardPaddingY: basePaddingY * 3,

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
};

export default LightTheme;
