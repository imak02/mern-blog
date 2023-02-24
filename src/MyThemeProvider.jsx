import { createTheme, ThemeProvider, responsiveFontSizes } from "@mui/material";
import { useContext } from "react";
import { DarkModeContext } from "./context/ThemeContextProvider";

const MyThemeProvider = ({ children }) => {
  const { myThemeMode } = useContext(DarkModeContext);

  let theme = createTheme({
    palette: {
      mode: myThemeMode,
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
