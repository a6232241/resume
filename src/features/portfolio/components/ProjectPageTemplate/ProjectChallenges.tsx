"use client";
import { useState } from "react";
import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["challenges"]>;
}

export default function ProjectChallenges({ data }: Props) {
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(0);

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">🔴 遇到的三大問題</h2>
      {data.map((challenge, idx) => (
        <div key={idx} className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setExpandedChallenge(expandedChallenge === idx ? null : idx)}
            className="w-full bg-gray-50 px-6 py-4 text-left hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold">
                  {idx + 1}. {challenge.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{challenge.symptom}</p>
              </div>
              <span className="text-xl">{expandedChallenge === idx ? "▼" : "▶"}</span>
            </div>
          </button>

          {expandedChallenge === idx && (
            <div className="border-t border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-900">
              <div className="mb-3">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">根本原因：</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{challenge.rootCause}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">影響：</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300">{challenge.impact}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
