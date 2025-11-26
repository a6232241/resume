import DarkModeIcon from "@public/dark_mode.svg";
import LightModeIcon from "@public/light_mode.svg";

export default function DayNightVisuals() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center overflow-hidden">
      {/* Sun - Visible in light mode, hidden in dark mode */}
      <div className="absolute transition-all duration-1000 ease-in-out dark:translate-y-32 dark:rotate-90 dark:opacity-0">
        <LightModeIcon className="h-96 w-96 text-orange-400 opacity-10" />
      </div>

      {/* Moon - Hidden in light mode, visible in dark mode */}
      <div className="absolute -translate-y-32 -rotate-90 opacity-0 transition-all duration-1000 ease-in-out dark:translate-y-0 dark:rotate-0 dark:opacity-100">
        <DarkModeIcon className="h-96 w-96 text-slate-200 opacity-10" />
      </div>
    </div>
  );
}
