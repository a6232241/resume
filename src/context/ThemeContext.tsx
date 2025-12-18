"use client";

import React, { useEffect, useState } from "react";

type DefaultValueType = {
  isDark: boolean;
  toggle: () => void;
  hasFirstToggle: boolean;
};

const defaultValue: DefaultValueType = {
  isDark: false,
  toggle: () => {},
  hasFirstToggle: false,
};

const ThemeContext = React.createContext<DefaultValueType>(defaultValue);

export const useTheme = () => React.useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [hasFirstToggle, setHasFirstToggle] = useState(false);

  const toggle = () => {
    setIsDark((prev) => {
      const newIsDark = !prev;
      document.documentElement.classList.toggle("dark", newIsDark);
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      return newIsDark;
    });
    setHasFirstToggle(true);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(theme === "dark" || (!theme && systemPrefersDark));
  }, []);

  return <ThemeContext.Provider value={{ isDark, toggle, hasFirstToggle }}>{children}</ThemeContext.Provider>;
}
