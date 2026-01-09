"use client";

import React from "react";

interface SummaryColumn {
  icon?: string;
  title: string;
  desc: React.ReactNode;
}

interface ProjectHeroProps {
  title: string;
  tagline: string;
  description?: React.ReactNode;
  summary?: {
    problem: SummaryColumn;
    solution: SummaryColumn;
    impact: SummaryColumn;
  };
  badge?: {
    text: string;
    icon?: string;
  };
  /** Explicit Tailwind classes required (not dynamically generated) */
  gradientClass?: string;
  borderGradientClass?: string;
}

export default function ProjectHero({
  title,
  tagline,
  description,
  summary,
  badge,
  gradientClass = "from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400",
  borderGradientClass = "from-purple-600/20 to-pink-600/20",
}: ProjectHeroProps) {
  return (
    <section>
      <h1
        className={`bg-gradient-to-r ${gradientClass} bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl`}>
        {title}
      </h1>

      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">{tagline}</p>

      {/* Verified Badge */}
      {badge && (
        <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-gradient-to-r from-green-500/20 to-emerald-500/20 px-4 py-2 shadow-lg shadow-green-500/10 backdrop-blur-sm">
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-semibold text-green-600 dark:text-green-400">{badge.text}</span>
        </div>
      )}

      {/* Description Content */}
      {description && (
        <div className="mt-8 rounded-xl bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:bg-gray-800/50">
          <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">{description}</div>
        </div>
      )}

      {/* Structured 3-Column Summary */}
      {summary && (
        <div className={`mt-8 rounded-2xl bg-gradient-to-r ${borderGradientClass} p-[1px]`}>
          <div className="rounded-2xl bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                  {summary.problem.icon && <span className="text-lg">{summary.problem.icon}</span>}
                  {summary.problem.title}
                </h3>
                <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.problem.desc}</p>
              </div>

              <div className="space-y-2 md:pr-6">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                  {summary.solution.icon && <span className="text-lg">{summary.solution.icon}</span>}
                  {summary.solution.title}
                </h3>
                <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.solution.desc}</p>
              </div>

              <div className="space-y-2 md:pr-6">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-600 uppercase dark:text-gray-400">
                  {summary.impact.icon && <span className="text-lg">{summary.impact.icon}</span>}
                  {summary.impact.title}
                </h3>
                <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.impact.desc}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

