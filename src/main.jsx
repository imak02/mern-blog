import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import MyThemeProvider from "./MyThemeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyThemeProvider>
      <App />
    </MyThemeProvider>
  </React.StrictMode>
);
