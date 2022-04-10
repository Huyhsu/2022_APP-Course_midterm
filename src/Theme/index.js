import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Grey / Inactived
    light700: "#888888",
    // Background
    light400: "#F4F4F4",
    // White
    light100: "#F8FEFF",
    // Black
    dark700: "#333333",
    // Primary
    primary700: "#024D61",
    // Secondary
    secondary700: "#E8F3FF",
    // Green
    green700: "#D3F9E7",
    // High
    high700: "#D27373",
    // Medium
    medium700: "#DEB16D",
    // Low
    low700: "#73C1D2",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    // light100: "#242525",
    light100: "#3A3B3C",
    light400: "#18191A",
    light700: "#888888",
    primary700: "#E4E6EB",
    green700: "#71857B",
    // secondary700: "#3A3B3C",
    secondary700: "#242525",
    high700: "#9F5757",
    medium700: "#AB8853",
    low700: "#57929F",
  },
};
