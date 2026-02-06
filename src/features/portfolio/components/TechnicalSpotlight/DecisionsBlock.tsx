"use client";

import { cn } from "@src/util/cn";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { DecisionsBlock as DecisionsBlockType } from "./types";

interface DecisionsBlockProps {
  block: DecisionsBlockType;
}

export function DecisionsBlock({ block }: DecisionsBlockProps) {
  const containerClass =
    "border-blue-200 bg-blue-500/10 text-blue-900 border-l-4 border-l-blue-500 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-200 dark:border-l-blue-500";
  const iconBgClass = "text-blue-700 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-900/30";

  const t = useTranslations("projects");

  const renderContent = () => {
    if (!block.items || !Array.isArray(block.items)) return null;

    return (
      <div className="flex flex-col gap-6">
        {block.items.map((problem, pIdx) => (
          <div key={pIdx} className="space-y-3">
            <h5 className="text-sm font-bold text-slate-700 dark:text-slate-300">{problem.title}</h5>
            <div className="flex flex-col gap-3">
              {problem.items.map((solution, sIdx) => (
                <div
                  key={sIdx}
                  className={cn(
                    "rounded-lg p-3 transition-colors",
                    solution.highlight
                      ? "-mx-3 border border-blue-500/20 bg-blue-500/10"
                      : "border border-dashed border-slate-300 bg-slate-50/50 dark:border-slate-700 dark:bg-slate-800/20",
                  )}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h6
                          className={cn(
                            "text-sm font-bold",
                            solution.highlight
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-slate-600 dark:text-slate-400",
                          )}>
                          {solution.title}
                        </h6>
                      </div>
                      {solution.desc && (
                        <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">{solution.desc}</p>
                      )}
                    </div>
                    {solution.highlight ? (
                      <span className="shrink-0 rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-600 uppercase dark:text-blue-400">
                        {t("selectedDecision")}
                      </span>
                    ) : (
                      <span className="shrink-0 rounded border border-slate-300 px-1.5 py-0.5 text-[10px] text-slate-500 opacity-60 dark:border-slate-700 dark:text-slate-500">
                        {t("notSelectedDecision")}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("relative overflow-hidden rounded-xl border p-5", containerClass)}>
      <div className="mb-4 flex items-center gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconBgClass)}>
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <h4 className="text-base font-bold">{block.title || "Engineering Decisions"}</h4>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}
