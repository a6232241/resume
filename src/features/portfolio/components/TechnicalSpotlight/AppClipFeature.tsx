import { cn } from "@src/util/cn";
import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { SpotlightItem } from "./types";

interface AppClipFeatureProps {
  item: SpotlightItem;
}

export function AppClipFeature({ item }: AppClipFeatureProps) {
  const t = useTranslations("projects");

  // Extract Challenge (Problem) and Solution blocks
  // Assuming strict order based on JSON: 0 -> Problem, 2 -> Solution
  // Fallback to empty if structure mismatch
  const challengeBlock = item.blocks[0];
  const solutionBlock = item.blocks[2];

  const renderListItems = (items: string[] | undefined) => {
    if (!items) return null;
    return (
      <ul className="flex flex-col gap-2">
        {items.map((text, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed opacity-90">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current/60" />
            <span>{text}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Summary */}
      <p className="text-base text-gray-600 dark:text-gray-300">{item.summary}</p>

      {/* Two-Column Layout: Challenge vs Solution */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Challenge Section */}
        <div className="relative overflow-hidden rounded-xl border border-red-200 bg-red-50/50 p-6 dark:border-red-900/30 dark:bg-red-900/10">
          <div className="mb-4 flex items-center gap-3 text-red-700 dark:text-red-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold">{challengeBlock?.title || "Challenge"}</h4>
          </div>
          <div className="text-red-900 dark:text-red-200">
            {/* Handle both string[] and object[] for items - JSON uses string[] for list type */}
            {Array.isArray(challengeBlock?.items) && typeof challengeBlock.items[0] === "string" ? (
              renderListItems(challengeBlock.items as string[])
            ) : (
              <p className="text-sm">Content format error</p>
            )}
          </div>
        </div>

        {/* Solution Section */}
        <div className="relative overflow-hidden rounded-xl border border-green-200 bg-green-50/50 p-6 dark:border-green-900/30 dark:bg-green-900/10">
          <div className="mb-4 flex items-center gap-3 text-green-700 dark:text-green-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h4 className="text-lg font-bold">{solutionBlock?.title || "Solution"}</h4>
          </div>
          <div className="text-green-900 dark:text-green-200">
            {Array.isArray(solutionBlock?.items) && typeof solutionBlock.items[0] === "string" ? (
              renderListItems(solutionBlock.items as string[])
            ) : (
              <p className="text-sm">Content format error</p>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Code Block */}
      {item.codeSnippet && (
        <div className="group relative">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-sm font-bold tracking-wider text-gray-500 uppercase">{t("codeSnippet")}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="font-medium text-purple-400">{item.codeSnippet.title}</span>
              <span className="h-1 w-1 rounded-full bg-gray-600"></span>
              <span className="uppercase">{item.codeSnippet.language}</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] shadow-xl">
            {/* Window Controls Decoration */}
            <div className="flex items-center gap-1.5 border-b border-gray-800/50 bg-[#161b22] px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
            </div>

            <div className="overflow-x-auto p-4 md:p-6">
              <pre className="font-mono text-xs leading-relaxed md:text-sm">
                {item.codeSnippet.code.split("\n").map((line, idx) => {
                  const lineNum = idx + 1;
                  const isHighlighted = item.codeSnippet?.highlights?.includes(lineNum);
                  const tooltip = item.codeSnippet?.tooltips?.find((t) => t.line === lineNum);

                  return (
                    <div
                      key={idx}
                      className={cn(
                        "relative -mx-6 flex px-6 py-0.5 transition-colors duration-200",
                        isHighlighted
                          ? "border-l-2 border-yellow-500 bg-yellow-500/10"
                          : "border-l-2 border-transparent",
                      )}>
                      {/* Line Number */}
                      <span className="mr-4 inline-block w-6 shrink-0 text-right text-gray-600 select-none">
                        {lineNum}
                      </span>

                      {/* Code Content */}
                      <span className={cn("flex-1 text-gray-300", isHighlighted && "font-medium text-yellow-100")}>
                        {line}
                      </span>

                      {/* Tooltip Indicator */}
                      {tooltip && (
                        <div className="group/tooltip relative ml-4 hidden items-center md:flex">
                          <Info className="h-4 w-4 cursor-help text-gray-500 transition-colors hover:text-purple-400" />

                          {/* Tooltip Content */}
                          <div className="pointer-events-none absolute top-1/2 right-full z-10 mr-3 w-48 translate-x-2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover/tooltip:pointer-events-auto group-hover/tooltip:translate-x-0 group-hover/tooltip:opacity-100">
                            <div className="relative rounded-lg border border-gray-700 bg-gray-800 p-2 text-xs text-gray-200 shadow-lg">
                              <div className="absolute top-1/2 -right-1.5 -mt-1.5 h-3 w-3 rotate-45 border-t border-r border-gray-700 bg-gray-800"></div>
                              {tooltip.content}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

