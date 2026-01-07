"use client";

interface Approach {
  id: number;
  name: string;
  difficulty: string;
  risk: string;
  maintainability: string;
  decision: string;
  reason?: string;
  tradeoff?: string;
  result?: string;
}

export interface SolutionEvaluationProps {
  title: string;
  approaches: Approach[];
}

export function SolutionEvaluation({ title, approaches }: SolutionEvaluationProps) {
  const getDecisionColor = (decision: string) => {
    if (decision.includes("✅")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (decision.includes("❌")) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
  };

  return (
    <section className="space-y-8">
      <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🎯 {title}</h2>

        {/* --- 方案評估網格 --- */}
        <div className="grid gap-4 md:grid-cols-2">
          {approaches.map((approach) => (
            <div
              key={approach.id}
              className="relative rounded-xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
              <div
                className={`absolute -top-3 right-4 rounded-full px-3 py-1 text-sm font-bold ${getDecisionColor(approach.decision)}`}>
                {approach.decision}
              </div>

              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                {approach.id}. {approach.name}
              </h3>

              <div className="mb-4 space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">難度：</span>
                  {approach.difficulty}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">風險：</span>
                  {approach.risk}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">可維護性：</span>
                  {approach.maintainability}
                </p>
              </div>

              {approach.reason && <p className="text-sm text-green-600 dark:text-green-400">✓ {approach.reason}</p>}
              {approach.tradeoff && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400">⚠️ {approach.tradeoff}</p>
              )}
              {approach.result && (
                <p className="text-sm font-medium text-green-600 dark:text-green-400">🎉 {approach.result}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

