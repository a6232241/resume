"use client";

/**
 * Overview metadata for a project
 */
interface OverviewData {
  /** Project duration (e.g., "2 weeks") */
  duration: string;
  /** Team composition */
  team: string;
  /** Project type/category */
  projectType: string;
  /** Main technologies used */
  mainTechs: string[];
  /** Focus areas (optional, can be string or array) */
  focus?: string | string[];
  /** Supported platforms (optional) */
  platforms?: string[];
}

/**
 * Performance metric for before/after comparison
 */
interface PerformanceMetric {
  /** Area/feature being measured */
  area: string;
  /** Value before optimization */
  before: string;
  /** Value after optimization */
  after: string;
  /** Improvement ratio (e.g., "10x") */
  improvement: string;
  /** Optional description of user experience impact */
  experienceDescription?: string;
}

/**
 * Props for the ProjectOverview component
 */
interface ProjectOverviewProps {
  /** Section title (default: "📊 項目概況") */
  title?: string;
  /** Project metadata */
  overview: OverviewData;
  /** Optional performance metrics with visual comparison */
  metrics?: PerformanceMetric[];
  /** Badge color for main techs (default: "blue") */
  techBadgeColor?: "blue" | "purple";
  /** Badge color for focus areas (default: "purple") */
  focusBadgeColor?: "purple" | "orange";
}

/**
 * A reusable Overview component for project detail pages.
 * Displays project metadata in a 4-column grid and optionally
 * shows performance metrics with visual before/after comparison.
 */
export default function ProjectOverview({
  title = "📊 項目概況",
  overview,
  metrics,
  techBadgeColor = "blue",
  focusBadgeColor = "purple",
}: ProjectOverviewProps) {
  // Parse focus as array if it's a string
  const focusItems = typeof overview.focus === "string" ? overview.focus.split(", ") : overview.focus;

  // Badge color classes
  const techBadgeClasses =
    techBadgeColor === "purple"
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

  const focusBadgeClasses =
    focusBadgeColor === "orange"
      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200"
      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";

  return (
    <section className="mb-12 space-y-8">
      {/* Project Overview Card */}
      <div className="rounded-2xl border border-white/10 bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>

        {/* Main Info Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* Duration */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">⏱️ 項目周期</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.duration}</p>
          </div>

          {/* Team */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">👤 團隊構成</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.team}</p>
          </div>

          {/* Project Type */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">🎯 項目類型</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.projectType}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">🛠️ 技術棧</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {overview.mainTechs.map((tech) => (
                <span key={tech} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${techBadgeClasses}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        {focusItems && focusItems.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">🎯 優化焦點</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {focusItems.map((item) => (
                <span key={item} className={`rounded-full px-3 py-1 text-sm font-medium ${focusBadgeClasses}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Platforms */}
        {overview.platforms && overview.platforms.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">📱 支援平台</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {overview.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Performance Metrics Section */}
      {metrics && metrics.length > 0 && (
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🚀 性能成果</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {metrics.map((metric) => {
              // Calculate the width percentage for the "after" bar relative to "before"
              const beforeValue = parseFloat(metric.before);
              const afterValue = parseFloat(metric.after);
              const afterWidthPercent = (afterValue / beforeValue) * 100;

              return (
                <div
                  key={metric.area}
                  className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{metric.area}</h3>

                  {/* Improvement Badge */}
                  <div className="mb-6 text-center">
                    <span className="inline-block rounded-2xl bg-green-100 px-8 py-4 dark:bg-green-900">
                      <span className="text-5xl font-extrabold text-green-600 dark:text-green-300">
                        降低 {metric.improvement}
                      </span>
                    </span>
                  </div>

                  {/* Time Comparison */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">改進前</p>
                      <p className="mt-1 text-2xl font-bold text-red-500">🔴 {metric.before}</p>
                    </div>
                    <div className="text-2xl text-gray-400">→</div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">改進後</p>
                      <p className="mt-1 text-2xl font-bold text-green-500">🟢 {metric.after}</p>
                    </div>
                  </div>

                  {/* Visual Comparison Bars */}
                  <div className="space-y-3">
                    {/* Before Bar (Red - Full Width) */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Before: ~{metric.before}</span>
                      </div>
                      <div className="flex h-8 w-full items-center rounded-lg bg-red-500 px-3 shadow-md">
                        <span className="text-xs font-bold text-white">{metric.before}</span>
                      </div>
                    </div>

                    {/* After Bar (Green - Proportional Width) */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>After: ~{metric.after}</span>
                      </div>
                      <div
                        className="flex h-8 items-center rounded-lg bg-green-500 px-3 shadow-md transition-all duration-500"
                        style={{ width: `${Math.max(afterWidthPercent, 10)}%` }}>
                        <span className="text-xs font-bold whitespace-nowrap text-white">{metric.after}</span>
                      </div>
                    </div>
                  </div>

                  {metric.experienceDescription && (
                    <p className="mt-4 text-center text-sm text-gray-600 italic dark:text-gray-400">
                      ✨ {metric.experienceDescription}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}

