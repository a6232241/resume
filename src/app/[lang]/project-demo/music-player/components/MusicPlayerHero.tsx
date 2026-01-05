"use client";

import React from "react";

/**
 * Props for Hero summary item (Problem/Solution/Impact)
 */
interface SummaryItem {
  title: string;
  desc: React.ReactNode;
}

/**
 * Props for the MusicPlayerHero component
 */
interface MusicPlayerHeroProps {
  /** Main page title */
  title: string;
  /** Tagline displayed below title */
  tagline: string;
  /** Three-column summary: problem, solution, impact */
  summary: {
    problem: SummaryItem;
    solution: SummaryItem;
    impact: SummaryItem;
  };
}

/**
 * MusicPlayerHero Component
 *
 * Displays the hero section with a gradient title, tagline, and
 * a three-column horizontal summary (Challenge/Solution/Impact)
 * styled with glassmorphism and gradient borders.
 */
export default function MusicPlayerHero({ title, tagline, summary }: MusicPlayerHeroProps) {
  return (
    <section className="mb-12">
      {/* Gradient Title */}
      <h1 className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl dark:from-purple-400 dark:via-pink-400 dark:to-orange-400">
        {title}
      </h1>

      {/* Tagline */}
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{tagline}</p>

      {/* Three-column Summary with Gradient Border */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 p-[1px]">
        <div className="rounded-2xl bg-white/50 p-6 shadow-lg backdrop-blur-sm dark:bg-gray-800/50">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
            {/* Problem Column */}
            <div className="space-y-2">
              <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                <span className="text-lg">🎯</span>
                {summary.problem.title}
              </h3>
              <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.problem.desc}</p>
            </div>

            {/* Solution Column */}
            <div className="space-y-2 md:pl-6">
              <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                <span className="text-lg">💡</span>
                {summary.solution.title}
              </h3>
              <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.solution.desc}</p>
            </div>

            {/* Impact Column */}
            <div className="space-y-2 md:pl-6">
              <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                <span className="text-lg">🚀</span>
                {summary.impact.title}
              </h3>
              <p className="leading-relaxed text-gray-900 dark:text-gray-100">{summary.impact.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

