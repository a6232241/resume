"use client";

interface PerformanceMetric {
  area: string;
  before: string;
  after: string;
  improvement: string;
  experienceDescription?: string;
}

interface OverviewData {
  duration: string;
  team: string;
  projectType: string;
  mainTechs: string[];
  focus?: string[];
}

interface PerformanceOverviewProps {
  overview: OverviewData;
  metrics: PerformanceMetric[];
}

export default function PerformanceOverview({ overview, metrics }: PerformanceOverviewProps) {
  return (
    <section className="mb-12 space-y-8">
      {/* 項目概況 */}
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📊 項目概況</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">⏱️ 項目周期</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.duration}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">👤 團隊構成</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.team}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">🎯 項目類型</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.projectType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">🛠️ 技術棧</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {overview.mainTechs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        {overview.focus && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">🎯 優化焦點</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {overview.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 性能成果 */}
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

                {/* Improvement Badge - Made MUCH Larger */}
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
    </section>
  );
}
