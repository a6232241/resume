"use client";

import React from "react";

/**
 * Single column in the hero summary grid
 */
interface SummaryColumn {
  /** Optional emoji icon */
  icon?: string;
  /** Column title */
  title: string;
  /** Column description (supports rich text) */
  desc: React.ReactNode;
}

/**
 * Gradient configuration for the title
 */
interface GradientConfig {
  from: string;
  via?: string;
  to: string;
}

/**
 * Props for the ProjectHero component
 */
interface ProjectHeroProps {
  /** Main title with gradient effect */
  title: string;
  /** Tagline/subtitle */
  tagline: string;
  /** Option A: Direct JSX for the description area (for complex layouts) */
  description?: React.ReactNode;
  /** Option B: Structured 3-column summary (Problem/Solution/Impact) */
  summary?: {
    problem: SummaryColumn;
    solution: SummaryColumn;
    impact: SummaryColumn;
  };
  /** Custom gradient colors for the title (defaults to blue→purple) */
  gradient?: GradientConfig;
}

/**
 * A reusable Hero component for project detail pages.
 * Displays a gradient title, tagline, and either a custom description
 * or a structured 3-column summary section.
 */
export default function ProjectHero({
  title,
  tagline,
  description,
  summary,
  gradient = { from: "blue-600", to: "purple-600" },
}: ProjectHeroProps) {
  // Build gradient class string
  const gradientClass = gradient.via
    ? `from-${gradient.from} via-${gradient.via} to-${gradient.to}`
    : `from-${gradient.from} to-${gradient.to}`;

  // Dark mode gradient
  const darkGradientClass = gradient.via
    ? `dark:from-${gradient.from.replace("600", "400")} dark:via-${gradient.via.replace("600", "400")} dark:to-${gradient.to.replace("600", "400").replace("500", "400")}`
    : `dark:from-${gradient.from.replace("600", "400")} dark:to-${gradient.to.replace("600", "400")}`;

  return (
    <section className="mb-12">
      {/* Gradient Title */}
      <h1
        className={`bg-gradient-to-r ${gradientClass} ${darkGradientClass} bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl`}>
        {title}
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{tagline}</p>

      {/* Description Content */}
      {description && (
        <div className="mt-8 rounded-xl bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:bg-gray-800/50">
          <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">{description}</div>
        </div>
      )}

      {/* Structured 3-Column Summary */}
      {summary && (
        <div
          className={`mt-8 rounded-2xl bg-gradient-to-r from-${gradient.from}/20 ${gradient.via ? `via-${gradient.via}/20` : ""} to-${gradient.to}/20 p-[1px]`}>
          <div className="rounded-2xl bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
              {/* Problem Column */}
              <div className="space-y-2">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  {summary.problem.icon && <span className="text-lg">{summary.problem.icon}</span>}
                  {summary.problem.title}
                </h3>
                <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.problem.desc}</p>
              </div>

              {/* Solution Column */}
              <div className="space-y-2 md:pl-6">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  {summary.solution.icon && <span className="text-lg">{summary.solution.icon}</span>}
                  {summary.solution.title}
                </h3>
                <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.solution.desc}</p>
              </div>

              {/* Impact Column */}
              <div className="space-y-2 md:pl-6">
                <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
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

