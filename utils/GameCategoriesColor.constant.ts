import { extendTheme } from "native-base";
import { CategoryEnum } from "../enums/Games/GamesParameters.enum";

// Define the NativeBase color palette
const theme = extendTheme({});

const colors = theme.colors;

const categoryColors = {
  [CategoryEnum.MMORPG]: {
    light: {
      borderColor: colors.emerald[400],
      textColor: colors.emerald[600],
      bgColor: colors.emerald[50],
    },
    dark: {
      borderColor: colors.emerald[800],
      textColor: colors.emerald[100],
      bgColor: colors.emerald[900],
    },
  },
  [CategoryEnum.SHOOTER]: {
    light: {
      borderColor: colors.blue[400],
      textColor: colors.black,
      bgColor: colors.blue[50],
    },
    dark: {
      borderColor: colors.blue[800],
      textColor: colors.white,
      bgColor: colors.blue[800],
    },
  },
  [CategoryEnum.STRATEGY]: {
    light: {
      borderColor: colors.amber[400],
      textColor: colors.black,
      bgColor: colors.amber[50],
    },
    dark: {
      borderColor: colors.amber[800],
      textColor: colors.white,
      bgColor: colors.amber[800],
    },
  },
  [CategoryEnum.ACTION]: {
    light: {
      borderColor: colors.cyan[400],
      textColor: colors.black,
      bgColor: colors.cyan[50],
    },
    dark: {
      borderColor: colors.cyan[800],
      textColor: colors.white,
      bgColor: colors.cyan[800],
    },
  },
  [CategoryEnum.RACING]: {
    light: {
      borderColor: colors.violet[400],
      textColor: colors.black,
      bgColor: colors.violet[50],
    },
    dark: {
      borderColor: colors.violet[800],
      textColor: colors.white,
      bgColor: colors.violet[800],
    },
  },
  [CategoryEnum.SPORTS]: {
    light: {
      borderColor: colors.indigo[400],
      textColor: colors.black,
      bgColor: colors.indigo[50],
    },
    dark: {
      borderColor: colors.indigo[800],
      textColor: colors.white,
      bgColor: colors.indigo[800],
    },
  },
  [CategoryEnum.MMO]: {
    light: {
      borderColor: colors.teal[400],
      textColor: colors.black,
      bgColor: colors.teal[50],
    },
    dark: {
      borderColor: colors.teal[800],
      textColor: colors.white,
      bgColor: colors.teal[800],
    },
  },
  [CategoryEnum.SURVIVAL]: {
    light: {
      borderColor: colors.orange[400],
      textColor: colors.black,
      bgColor: colors.orange[50],
    },
    dark: {
      borderColor: colors.orange[800],
      textColor: colors.white,
      bgColor: colors.orange[800],
    },
  },
  [CategoryEnum.SOCIAL]: {
    light: {
      borderColor: colors.pink[400],
      textColor: colors.black,
      bgColor: colors.pink[50],
    },
    dark: {
      borderColor: colors.pink[800],
      textColor: colors.white,
      bgColor: colors.pink[800],
    },
  },
};

export default categoryColors;
