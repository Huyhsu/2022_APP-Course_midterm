import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Inactived
    light700: "#888888",
    // Grey
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
    light100: "#121212",
    // light400: "",
    primary700: "white",
    green700: "#888888",
    // secondary700: "#111111",
  },
};
