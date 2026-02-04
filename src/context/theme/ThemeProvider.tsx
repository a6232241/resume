"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import type { Theme, ThemeContextValue } from "./theme.types";

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({ children, initialTheme = "light", storageKey = "theme" }: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [hasFirstToggle, setHasFirstToggle] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const resolvedTheme: Theme = storedTheme || (systemPrefersDark ? "dark" : "light");

    setThemeState(resolvedTheme);
    applyTheme(resolvedTheme);
  }, [storageKey]);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
    setHasFirstToggle(true);
  };

  const value: ThemeContextValue = {
    theme,
    isDark: theme === "dark",
    toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
    setTheme,
    hasFirstToggle,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
