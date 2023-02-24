import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./context/AuthContextProvider";
import DarkModeContextProvider from "./context/ThemeContextProvider";
import "./index.css";
import MyThemeProvider from "./MyThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <MyThemeProvider>
          <App />
        </MyThemeProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
