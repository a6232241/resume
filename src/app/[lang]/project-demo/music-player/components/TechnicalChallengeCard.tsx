"use client";

/**
 * Solution details for a technical challenge
 */
interface SolutionData {
  /** The approach used to solve the problem */
  approach: string;
  /** Detailed implementation steps */
  details: string[];
  /** The result achieved */
  result: string;
  /** Category of the solution (e.g., State Management) */
  category: string;
}

/**
 * Challenge data structure
 */
interface ChallengeData {
  /** Unique identifier */
  id: number;
  /** Challenge title */
  title: string;
  /** Visible symptom of the issue */
  symptom: string;
  /** Root cause of the problem */
  rootCause: string;
  /** Impact on users/system */
  impact: string;
  /** Code snippet demonstrating the solution */
  codeSnippet: string;
  /** Terms to highlight in the code */
  highlightTerms: string[];
  /** Solution details */
  solution: SolutionData;
}

/**
 * Props for the TechnicalChallengeCard component
 */
interface TechnicalChallengeCardProps {
  /** Array of challenge data */
  challenges: ChallengeData[];
}

/**
 * Highlight specific terms in code with custom styling
 */
function highlightCode(code: string, terms: string[]): React.ReactNode {
  if (!terms || terms.length === 0) return code;

  // Split code into lines for proper rendering
  const lines = code.split("\n");

  return lines.map((line, lineIndex) => {
    let result: React.ReactNode[] = [];
    let currentText = line;
    let keyIndex = 0;

    // Process each highlight term
    terms.forEach((term) => {
      const parts = currentText.split(term);
      if (parts.length > 1) {
        const newResult: React.ReactNode[] = [];
        parts.forEach((part, i) => {
          if (part) {
            newResult.push(<span key={`${lineIndex}-${keyIndex++}`}>{part}</span>);
          }
          if (i < parts.length - 1) {
            newResult.push(
              <span
                key={`${lineIndex}-hl-${keyIndex++}`}
                className="rounded bg-yellow-500/30 px-1 font-bold text-yellow-200">
                {term}
              </span>,
            );
          }
        });
        result = newResult;
        currentText = parts.join("");
      }
    });

    if (result.length === 0) {
      result = [<span key={`${lineIndex}-text`}>{line}</span>];
    }

    return (
      <div key={lineIndex} className="leading-relaxed">
        {result}
      </div>
    );
  });
}

export default function TechnicalChallengeCard({ challenges }: TechnicalChallengeCardProps) {
  return (
    <section className="relative mb-12">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">🔧 技術挑戰與解決方案</h2>

      {/* Container with vertical line */}
      <div className="relative">
        {/* Vertical connection line */}
        <div className="absolute top-0 left-6 hidden h-full w-px bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-orange-500/50 md:block" />

        {/* Challenge Cards */}
        <div className="space-y-8">
          {challenges.map((challenge, index) => (
            <div key={challenge.id} className="relative">
              {/* Connection dot */}
              <div className="absolute top-8 left-4 z-10 hidden h-4 w-4 rounded-full border-2 border-purple-500 bg-gray-900 md:block" />

              {/* Card Content */}
              <div className="ml-0 md:ml-12">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm">
                  {/* Card Header */}
                  <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-pink-900/20 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">
                        <span className="mr-2 text-purple-400">#{index + 1}</span>
                        {challenge.title}
                      </h3>
                      <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
                        {challenge.solution.category}
                      </span>
                    </div>
                  </div>

                  {/* Card Body - Problem & Solution Pairing */}
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Left: Challenge Details */}
                    <div className="border-b border-white/10 p-6 lg:border-r lg:border-b-0">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-red-400 uppercase">
                        <span>⚠️</span> 問題分析
                      </h4>

                      <div className="space-y-4">
                        {/* Symptom */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">症狀</p>
                          <p className="mt-1 text-gray-900 dark:text-gray-100">{challenge.symptom}</p>
                        </div>

                        {/* Root Cause */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">根本原因</p>
                          <p className="mt-1 text-gray-900 dark:text-gray-100">{challenge.rootCause}</p>
                        </div>

                        {/* Impact */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">影響</p>
                          <p className="mt-1 text-gray-900 dark:text-gray-100">{challenge.impact}</p>
                        </div>
                      </div>

                      {/* Solution Approach */}
                      <div className="mt-6 rounded-lg bg-green-500/10 p-4">
                        <h4 className="mb-2 flex items-center gap-2 text-sm font-bold tracking-wider text-green-400 uppercase">
                          <span>✅</span> 解決方案
                        </h4>
                        <p className="mb-3 font-mono text-sm font-bold text-green-300">{challenge.solution.approach}</p>
                        <ul className="space-y-1">
                          {challenge.solution.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="mt-1 text-green-400">•</span>
                              {detail}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-3 border-t border-green-500/20 pt-3 text-sm text-green-300">
                          <span className="font-bold">結果：</span> {challenge.solution.result}
                        </p>
                      </div>
                    </div>

                    {/* Right: Code Snippet */}
                    <div className="bg-gray-900/50 p-6">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-bold tracking-wider text-blue-400 uppercase">
                        <span>💻</span> 核心程式碼
                      </h4>
                      <div className="overflow-x-auto rounded-lg bg-gray-950 p-4">
                        <pre className="font-mono text-sm text-gray-300">
                          <code>{highlightCode(challenge.codeSnippet, challenge.highlightTerms)}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

