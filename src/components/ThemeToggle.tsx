"use client";

import DarkModeIcon from "@public/dark_mode.svg";
import LightModeIcon from "@public/light_mode.svg";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (theme === "dark" || (!theme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        className="rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
        aria-label={isDark ? "切換到淺色模式" : "切換到深色模式"}>
        {isDark ? (
          <DarkModeIcon color="var(--color-foreground)" width={24} height={24} />
        ) : (
          <LightModeIcon color="var(--color-foreground)" width={24} height={24} />
        )}
      </button>
    </>
  );
}
