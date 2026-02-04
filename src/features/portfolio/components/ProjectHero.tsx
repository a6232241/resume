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
  gradientClass?: string;
  borderGradientClass?: string;
}

export default function ProjectHero({
  title,
  tagline,
  description,
  summary,
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
