import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";

const MyThemeProvider = ({ children }) => {
  let theme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#7286d3",
      },
      secondary: {
        main: "#F1F7B5",
      },
      focusInput: {
        main: "#0000ff",
      },
    },
  });
  theme = responsiveFontSizes(theme);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyThemeProvider;
