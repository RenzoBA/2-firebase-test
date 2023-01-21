"use client";

import { createContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "../../firebase";

export const MyContext = createContext({
  darkMode: false,
  setDarkMode: () => {},
  user: {},
});

const ContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const auth = getAuth(app);
  return (
    <MyContext.Provider value={{ darkMode, setDarkMode, auth }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
