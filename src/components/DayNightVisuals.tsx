"use client";

export default function DayNightVisuals() {
  return (
    <>
      {/* Animated Sky Background */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-sky-200 transition-colors duration-1000 ease-in-out dark:bg-slate-900" />

      {/* Sun - Visible in light mode, moves from left to right when switching to dark */}
      <div className="pointer-events-none fixed top-20 left-0 -z-10 animate-[planetShow_1s_ease-out_forwards] dark:animate-[planetHide_1s_ease-out_forwards]">
        <svg className="h-24 w-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Sun rays */}
          <g className="animate-pulse" opacity="0.6">
            <line x1="50" y1="5" x2="50" y2="15" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="85" x2="50" y2="95" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="5" y1="50" x2="15" y2="50" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="85" y1="50" x2="95" y2="50" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="18" y1="18" x2="25" y2="25" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="75" y1="75" x2="82" y2="82" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="82" y1="18" x2="75" y2="25" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
            <line x1="25" y1="75" x2="18" y2="82" stroke="#FDB813" strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Sun circle */}
          <circle cx="50" cy="50" r="20" fill="#FDB813" />
          <circle cx="50" cy="50" r="18" fill="#FBBF24" />
        </svg>
      </div>

      {/* Moon - Visible in dark mode, moves from left to right when switching to light */}
      <div className="pointer-events-none fixed top-20 left-0 -z-10 animate-[planetHide_1s_ease-out_forwards] dark:animate-[planetShow_1s_ease-out_forwards]">
        <svg className="h-24 w-24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          {/* Moon crescent */}
          <circle cx="50" cy="50" r="22" fill="#E5E7EB" />
          <circle cx="58" cy="45" r="18" fill="#1E293B" />
          {/* Moon craters */}
          <circle cx="42" cy="45" r="4" fill="#D1D5DB" opacity="0.5" />
          <circle cx="48" cy="58" r="3" fill="#D1D5DB" opacity="0.5" />
          <circle cx="38" cy="55" r="2" fill="#D1D5DB" opacity="0.5" />
        </svg>
      </div>
    </>
  );
}
