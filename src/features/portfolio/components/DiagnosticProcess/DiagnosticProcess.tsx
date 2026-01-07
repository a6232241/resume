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

export interface DiagnosticProcessProps {
  process: ProcessStep[];
  findings: Finding[];
}

export function DiagnosticProcess({ process, findings }: DiagnosticProcessProps) {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🔍 診斷過程</h2>

        {/* --- Horizontal Stepper --- */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {process.map((step) => (
            <div key={step.step} className="relative">
              <div className="rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-md transition-shadow hover:shadow-lg dark:border-blue-700 dark:from-blue-900/30 dark:to-indigo-900/30">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-lg font-bold text-white shadow-lg">
                  {step.step}
                </div>

                <div className="mt-2 mb-3 flex items-center gap-2">
                  <span className="text-3xl">{step.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{step.title}</h3>
                </div>

                {step.tool && (
                  <div className="mb-3 rounded-lg bg-white px-3 py-2 dark:bg-gray-800">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">🛠️ {step.tool}</p>
                  </div>
                )}

                {step.keyFinding && (
                  <div className="mt-3 rounded-lg bg-amber-100 px-3 py-3 dark:bg-amber-900/40">
                    <p className="text-xs font-semibold tracking-wide text-amber-700 uppercase dark:text-amber-300">
                      💡 Key Insight
                    </p>
                    <p className="mt-1 text-sm leading-snug font-bold text-amber-900 dark:text-amber-100">
                      {step.keyFinding}
                    </p>
                  </div>
                )}

                {step.description && (
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                )}
              </div>

              {step.step < process.length && (
                <div className="absolute top-1/2 -right-3 hidden -translate-y-1/2 text-2xl text-blue-400 lg:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- 核心發現 --- */}
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

