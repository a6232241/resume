"use client";

import { useState } from "react";

/**
 * Technical insight data structure
 */
interface Insight {
  id: number;
  title: string;
  icon: string;
  collapsedSummary?: string;
  concept?: string;
  impact?: string;
  solution?: string;
  solutions?: string[];
  lesson?: string;
  methodology?: string;
  tools?: string[];
  benefit?: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  resource?: string;
  example?: string;
  practice?: string;
  keyTakeaway: string;
}

/**
 * Props for TechnicalInsights component
 */
export interface TechnicalInsightsProps {
  insights: Insight[];
}

/**
 * TechnicalInsights Component
 *
 * Displays a collapsible list of technical insights
 * with detailed breakdowns for each insight.
 */
export function TechnicalInsights({ insights }: TechnicalInsightsProps) {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="mb-12">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">💡 技術洞察</h2>

        <div className="space-y-4">
          {insights.map((insight) => {
            const isExpanded = expandedIds.has(insight.id);

            return (
              <div
                key={insight.id}
                className="rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                {/* 標題 - 可點擊展開 */}
                <div
                  className="flex cursor-pointer items-center justify-between p-4"
                  onClick={() => toggleExpand(insight.id)}>
                  <div className="flex flex-1 items-center gap-3">
                    <span className="text-2xl">{insight.icon}</span>
                    <div className="flex flex-1 flex-col sm:flex-row sm:items-center sm:gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{insight.title}</h3>
                      {!isExpanded && insight.collapsedSummary && (
                        <div className="mt-1 flex items-center gap-1 sm:mt-0 sm:border-l sm:pl-2 dark:border-gray-600">
                          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {insight.collapsedSummary}
                          </p>
                        </div>
                      )}
                      {isExpanded && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">🎯 {insight.keyTakeaway}</p>
                      )}
                    </div>
                  </div>
                  <span
                    className="ml-2 text-xl text-gray-400 transition-transform duration-200"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>
                    ▼
                  </span>
                </div>

                {/* 展開內容 */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                    <div className="space-y-3 text-sm">
                      {insight.concept && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">核心概念</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.concept}</p>
                        </div>
                      )}

                      {insight.impact && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">影響</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.impact}</p>
                        </div>
                      )}

                      {insight.solution && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">解決方案</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.solution}</p>
                        </div>
                      )}

                      {insight.solutions && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">解決方案</p>
                          <ul className="mt-1 list-inside list-disc text-gray-600 dark:text-gray-300">
                            {insight.solutions.map((sol, idx) => (
                              <li key={idx}>{sol}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {insight.lesson && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">教訓</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.lesson}</p>
                        </div>
                      )}

                      {insight.methodology && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">方法</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.methodology}</p>
                          {insight.tools && (
                            <p className="mt-1 text-gray-500 dark:text-gray-400">工具：{insight.tools.join(" / ")}</p>
                          )}
                        </div>
                      )}

                      {insight.challenge && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">挑戰</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.challenge}</p>
                        </div>
                      )}

                      {insight.approach && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">做法</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.approach}</p>
                        </div>
                      )}

                      {insight.outcome && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">結果</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.outcome}</p>
                        </div>
                      )}

                      {insight.resource && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">資源</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.resource}</p>
                        </div>
                      )}

                      {insight.example && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">例子</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.example}</p>
                        </div>
                      )}

                      {insight.practice && (
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">最佳實踐</p>
                          <p className="text-gray-600 dark:text-gray-300">{insight.practice}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

