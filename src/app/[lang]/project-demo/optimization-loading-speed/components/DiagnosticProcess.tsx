"use client";

interface ProcessStep {
  step: number;
  title: string;
  icon: string;
  description?: string;
  tool?: string;
  keyFinding?: string;
}

interface Finding {
  id: number;
  title: string;
  icon: string;
  symptom: string;
  metric?: string;
  locations?: string[];
  impact?: string;
}

interface DiagnosticProcessProps {
  process: ProcessStep[];
  findings: Finding[];
}

export default function DiagnosticProcess({ process, findings }: DiagnosticProcessProps) {
  return (
    <section className="mb-12 space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🔍 診斷過程</h2>

        {/* 時間線 */}
        <div className="relative">
          <div className="absolute top-0 left-4 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className="space-y-6">
            {process.map((step) => (
              <div key={step.step} className="relative flex gap-4 pl-10">
                <div className="absolute left-0 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                  {step.step}
                </div>
                <div className="flex-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                  </div>
                  {step.description && <p className="mt-2 text-gray-600 dark:text-gray-300">{step.description}</p>}
                  {step.tool && <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">🛠️ 工具：{step.tool}</p>}
                  {step.keyFinding && (
                    <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                      💡 關鍵發現：{step.keyFinding}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 核心發現 */}
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">⚠️ 核心發現</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {findings.map((finding) => (
            <div
              key={finding.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{finding.icon}</span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{finding.title}</h3>
              </div>
              <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">症狀：</span>
                {finding.symptom}
              </p>
              {finding.metric && (
                <p className="mb-2 rounded bg-red-100 px-2 py-1 text-sm font-medium text-red-800 dark:bg-red-900 dark:text-red-200">
                  📊 {finding.metric}
                </p>
              )}
              {finding.locations && (
                <ul className="mb-2 space-y-1">
                  {finding.locations.map((loc) => (
                    <li key={loc} className="text-sm text-gray-600 dark:text-gray-300">
                      📍 {loc}
                    </li>
                  ))}
                </ul>
              )}
              {finding.impact && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">影響：</span>
                  {finding.impact}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

