import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3d6bb3",
      main: "#0d47a1",
      dark: "#093170",
      contrastText: "#fff",
    },
    secondary: {
      light: "#9f3e72",
      main: "#880e4f",
      dark: "#5f0937",
      contrastText: "#fff",
    },
  },
});

export default theme;
