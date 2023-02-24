import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import DarkModeContextProvider from "./context/ThemeContextProvider";
import "./index.css";
import MyThemeProvider from "./MyThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <MyThemeProvider>
        <App />
      </MyThemeProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
