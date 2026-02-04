"use client";

import { useState } from "react";

interface KeyChange {
  type?: string;
  file?: string;
  removed?: string;
  change?: string;
  from?: string;
  to?: string;
  impact?: string;
}

interface Phase {
  phase: number;
  title: string;
  duration: string;
  steps?: string[];
  result: string;
  keyChange?: KeyChange;
  keyChanges?: KeyChange[];
  issue?: string;
  solution?: string;
}

export interface TechnicalImplementationProps {
  phases: Phase[];
}

export function TechnicalImplementation({ phases }: TechnicalImplementationProps) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

  return (
    <section className="backdrop-blur-sm">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">💻 技術實施</h2>

        <div className="space-y-4">
          {phases.map((phase) => (
            <div
              key={phase.phase}
              className="rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between p-6"
                onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Phase {phase.phase}: {phase.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">⏱️ {phase.duration}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-bold text-green-800 dark:bg-green-900 dark:text-green-200">
                    {phase.result}
                  </span>
                  <span className="text-xl text-gray-400">{expandedPhase === phase.phase ? "▼" : "▶"}</span>
                </div>
              </div>

              {expandedPhase === phase.phase && (
                <div className="border-t border-gray-200 p-6 dark:border-gray-700">
                  {phase.steps && (
                    <div className="mb-6">
                      <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">🎯 實施步驟</h4>
                      <ol className="list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
                        {phase.steps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {phase.issue && (
                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium text-red-600 dark:text-red-400">問題：</span>
                        {phase.issue}
                      </p>
                    </div>
                  )}
                  {phase.solution && (
                    <div className="mb-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        <span className="font-medium text-green-600 dark:text-green-400">解決方案：</span>
                        {phase.solution}
                      </p>
                    </div>
                  )}

                  {phase.keyChange && (
                    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
                      <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">💾 關鍵改動</h4>
                      {phase.keyChange.type && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">類型：{phase.keyChange.type}</p>
                      )}
                      {phase.keyChange.file && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          文件：
                          <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">{phase.keyChange.file}</code>
                        </p>
                      )}
                      {phase.keyChange.removed && (
                        <p className="text-sm text-red-600 dark:text-red-400">移除：{phase.keyChange.removed}</p>
                      )}
                    </div>
                  )}

                  {phase.keyChanges && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">💾 關鍵改動</h4>
                      {phase.keyChanges.map((change, idx) => (
                        <div key={idx} className="rounded-lg bg-gray-100 p-4 dark:bg-gray-900">
                          <p className="font-medium text-gray-900 dark:text-white">{change.change}</p>
                          {change.from && change.to && (
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              版本：{change.from} → {change.to}
                            </p>
                          )}
                          {change.impact && (
                            <p className="mt-1 text-sm text-green-600 dark:text-green-400">效果：{change.impact}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
