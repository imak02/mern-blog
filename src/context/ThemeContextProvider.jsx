import React, { createContext, useState } from "react";

const DarkModeContext = createContext("");

const DarkModeContextProvider = ({ children }) => {
  const [myThemeMode, setMyThemeMode] = useState(
    localStorage.getItem("myThemeMode") || "light"
  );
  return (
    <DarkModeContext.Provider value={{ myThemeMode, setMyThemeMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeContextProvider;
export { DarkModeContext };
