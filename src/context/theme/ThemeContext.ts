"use client";

import React from "react";
import type { ThemeContextValue } from "./theme.types";

const defaultValue: ThemeContextValue = {
  theme: "light",
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  hasFirstToggle: false,
};

export const ThemeContext = React.createContext<ThemeContextValue>(defaultValue);
ThemeContext.displayName = "ThemeContext";
