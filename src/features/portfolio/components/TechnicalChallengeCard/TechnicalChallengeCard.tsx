"use client";

import { SingleCodeBlock } from "./SingleCodeBlock";
import { TabbedCodeBlock } from "./TabbedCodeBlock";

interface SolutionData {
  approach: string;
  details: string[];
  result: string;
  category?: string;
}

interface ChallengeData {
  id: number;
  title: string;
  symptom: string;
  rootCause?: string;
  impact?: string;
  badge?: string;
  metrics?: {
    label: string;
    before: string;
    after: string;
  };
  filePath?: string;
  codeSnippet?: string;
  highlightTerms?: string[];
  multiHighlightTerms?: string[][];
  filePaths?: string[];
  codeSnippets?: string[];
  solution: SolutionData;
}

export interface TechnicalChallengeCardProps {
  challenges: ChallengeData[];
}

export function TechnicalChallengeCard({ challenges }: TechnicalChallengeCardProps) {
  return (
    <section className="relative">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">🔧 技術挑戰與解決方案</h2>

      {/* --- Container with vertical line --- */}
      <div className="relative">
        <div className="absolute top-0 left-6 hidden h-full w-px bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-orange-500/50 md:block" />

        {/* --- Challenge Cards --- */}
        <div className="space-y-8">
          {challenges.map((challenge, index) => {
            const hasMultiSnippets = challenge.codeSnippets && challenge.codeSnippets.length > 0;
            const hasFilePaths = challenge.filePaths && challenge.filePaths.length > 0;
            const hasMultiHighlightTerms = challenge.multiHighlightTerms && challenge.multiHighlightTerms.length > 0;

            return (
              <div key={challenge.id} className="relative">
                <div className="absolute top-8 left-4 z-10 hidden h-4 w-4 rounded-full border-2 border-purple-500 bg-gray-900 md:block" />

                <div className="ml-0 md:ml-12">
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
                    <div className="border-b border-gray-200 bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-4 dark:border-white/10 dark:from-purple-900/20 dark:to-pink-900/20">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          <span className="mr-2 text-purple-600 dark:text-purple-400">#{index + 1}</span>
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          {challenge.badge && (
                            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-300">
                              ✓ {challenge.badge}
                            </span>
                          )}
                          {challenge.solution.category && (
                            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-600 dark:text-purple-300">
                              {challenge.solution.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* --- Problem & Solution Pairing --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Left: Challenge Details */}
                      <div className="border-b border-gray-200 p-6 lg:border-r lg:border-b-0 dark:border-white/10">
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-red-500 uppercase dark:text-red-400">
                          <span>⚠️</span> 問題分析
                        </h4>

                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">症狀</p>
                            <p className="mt-1 text-gray-900 dark:text-gray-100">{challenge.symptom}</p>
                          </div>

                          {challenge.rootCause && (
                            <div>
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">根本原因</p>
                              <p className="mt-1 text-gray-900 dark:text-gray-100">{challenge.rootCause}</p>
                            </div>
                          )}

                          {challenge.impact && (
                            <div>
                              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">影響</p>
                              <p className="mt-1 text-gray-900 dark:text-gray-100">{challenge.impact}</p>
                            </div>
                          )}

                          {challenge.metrics && (
                            <div className="mt-4 rounded-lg border border-orange-500/30 bg-orange-500/10 p-3">
                              <p className="text-xs font-medium text-orange-600 dark:text-orange-400">
                                {challenge.metrics.label}
                              </p>
                              <div className="mt-1 flex items-center gap-2">
                                <span className="text-lg font-bold text-red-500 line-through dark:text-red-400">
                                  {challenge.metrics.before}
                                </span>
                                <span className="text-gray-500 dark:text-gray-500">→</span>
                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                  {challenge.metrics.after}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Solution Approach */}
                        <div className="mt-6 rounded-lg bg-green-500/10 p-4">
                          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-green-600 uppercase dark:text-green-400">
                            <span>✅</span> 解決方案
                          </h4>
                          <p className="mb-3 font-mono text-sm font-bold text-green-700 dark:text-green-300">
                            {challenge.solution.approach}
                          </p>
                          <ul className="space-y-1">
                            {challenge.solution.details.map((detail, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <span className="mt-1 text-green-500 dark:text-green-400">•</span>
                                {detail}
                              </li>
                            ))}
                          </ul>
                          {challenge.solution.result && (
                            <p className="mt-3 border-t border-green-500/20 pt-3 text-sm text-green-700 dark:text-green-300">
                              <span className="font-bold">結果：</span> {challenge.solution.result}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* --- Code Snippet --- */}
                      <div className="bg-gray-100 p-6 dark:bg-gray-900/50">
                        <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-blue-500 uppercase dark:text-blue-400">
                          <span>💻</span> 核心程式碼
                        </h4>

                        {hasMultiSnippets && hasFilePaths && hasMultiHighlightTerms ? (
                          <TabbedCodeBlock
                            filePaths={challenge.filePaths!}
                            codeSnippets={challenge.codeSnippets!}
                            multiHighlightTerms={challenge.multiHighlightTerms!}
                          />
                        ) : (
                          <SingleCodeBlock
                            filePath={challenge.filePath}
                            codeSnippet={challenge.codeSnippet || ""}
                            highlightTerms={challenge.highlightTerms || []}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

