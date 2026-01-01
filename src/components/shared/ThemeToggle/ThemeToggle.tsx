"use client";

import { useTheme } from "@context/theme";
import DarkModeIcon from "@public/dark_mode.svg";
import LightModeIcon from "@public/light_mode.svg";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

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
