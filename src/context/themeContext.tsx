import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorageState } from "../hooks/useLocalStrorage";

type theme = "light" | "dark";

interface ThemeContextProps {
  theme: theme;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // use the a custom hook to load the perefered theme from localStorage or set it dark if it's not set yet
  const [theme, setTheme] = useLocalStorageState({
    initialState: "dark",
    key: "theme",
  });

  // set the theme dark as default or the stored theme in local storage if it's set before
  useEffect(() => {
    // const preferedTheme = window.matchMedia(
    //   "(prefers-color-scheme: dark)"
    // ).matches;

    // console.log(window.matchMedia("(prefers-color-scheme: dark)"));
    // if (preferedTheme) return document.documentElement.classList.add(theme);

    // setTheme("light");
    document.documentElement.classList.add(theme);
  }, []);

  const toggleTheme = () => {
    const newTheme: theme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

export { ThemeProvider, useTheme };
