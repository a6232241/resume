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
          {metrics.map((metric) => (
            <div
              key={metric.area}
              className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{metric.area}</h3>
              <div className="flex items-center justify-between">
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
              <div className="mt-4 text-center">
                <span className="rounded-full bg-green-100 px-4 py-1 text-lg font-bold text-green-800 dark:bg-green-900 dark:text-green-200">
                  降低 {metric.improvement}
                </span>
              </div>
              {metric.experienceDescription && (
                <p className="mt-4 text-center text-sm text-gray-600 italic dark:text-gray-400">
                  ✨ {metric.experienceDescription}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

