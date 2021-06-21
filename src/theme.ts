import { createMuiTheme, lighten, Theme } from "@material-ui/core";

export const theme: Theme = createMuiTheme({
  palette: {
    type: "dark",
    common: { black: "#000", white: "#fff" },
    background: {
      paper: lighten("#1e1e1e", 0.05),
      default: "#1e1e1e",
    },
    primary: {
      light: "#7986cb",
      main: "rgba(144, 19, 254, 1)",
      dark: "#303f9f",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff4081",
      main: "#f50057",
      dark: "#c51162",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "rgba(197, 197, 197, 1)",
    },
    // divider: "#383838",
    text: {
      primary: "#ccc",
      secondary: "rgba(180, 180, 180, 1)",
    },
    action: {
      active: "rgba(180, 180, 180, 1)",
    },
  },
});
