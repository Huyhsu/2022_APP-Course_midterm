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
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    light400: "#F4F4F4",
    primary700: "white",
  },
};
