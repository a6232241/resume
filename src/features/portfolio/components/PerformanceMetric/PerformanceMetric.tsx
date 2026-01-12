interface PerformanceMetric {
  area: string;
  before: string;
  after: string;
  improvement: string;
  experienceDescription?: string;
}

interface Props {
  metrics: PerformanceMetric[];
}

export function PerformanceMetric({ metrics }: Props) {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg backdrop-blur-sm dark:bg-white/5">
      <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🚀 性能成果</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {metrics.map((metric) => {
          const beforeValue = parseFloat(metric.before);
          const afterValue = parseFloat(metric.after);
          const afterWidthPercent = (afterValue / beforeValue) * 100;

          return (
            <div
              key={metric.area}
              className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 dark:from-gray-800 dark:to-gray-900">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{metric.area}</h3>

              <div className="mb-6 text-center">
                <span className="inline-block rounded-2xl bg-green-100 px-8 py-4 dark:bg-green-900">
                  <span className="text-5xl font-extrabold text-green-600 dark:text-green-300">
                    降低 {metric.improvement}
                  </span>
                </span>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">改進前</p>
                  <p className="mt-1 text-2xl font-bold text-red-500">🔴 {metric.before}</p>
                </div>
                <div className="text-2xl text-gray-500 dark:text-gray-400">→</div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">改進後</p>
                  <p className="mt-1 text-2xl font-bold text-green-500">🟢 {metric.after}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-gray-700 dark:text-gray-400">
                    <span>Before: ~{metric.before}</span>
                  </div>
                  <div className="flex h-8 w-full items-center rounded-lg bg-red-500 px-3 shadow-md">
                    <span className="text-xs font-bold text-white">{metric.before}</span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between text-xs text-gray-700 dark:text-gray-400">
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
                <p className="mt-4 text-center text-sm text-gray-700 italic dark:text-gray-400">
                  ✨ {metric.experienceDescription}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

