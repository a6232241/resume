"use client";
import { useState } from "react";
import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["solutions"]>;
}

export default function ProjectSolutions({ data }: Props) {
  const [expandedSolution, setExpandedSolution] = useState<number | null>(0);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">✅ 解決方案與優化</h2>
      {data.map((solution, idx) => (
        <div
          key={idx}
          className="overflow-hidden rounded-lg border border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/10">
          <button
            onClick={() => setExpandedSolution(expandedSolution === idx ? null : idx)}
            className="w-full px-6 py-4 text-left hover:bg-green-100 dark:hover:bg-green-900/20">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-300">{solution.approach}</h4>
                <p className="mt-1 text-sm text-green-700 dark:text-green-400">{solution.problem}</p>
              </div>
              <span className="text-xl">{expandedSolution === idx ? "▼" : "▶"}</span>
            </div>
          </button>

          {expandedSolution === idx && (
            <div className="border-t border-green-200 bg-white px-6 py-4 dark:border-green-900 dark:bg-gray-900">
              {solution.details && (
                <div className="mb-4">
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">實現步驟：</p>
                  <ol className="list-inside list-decimal space-y-1">
                    {solution.details.map((detail, i) => (
                      <li key={i} className="text-gray-700 dark:text-gray-300">
                        {detail}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">成果：</p>
                <p className="mt-1 rounded-lg bg-green-100 px-3 py-2 text-green-900 dark:bg-green-900/30 dark:text-green-300">
                  {solution.result}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
