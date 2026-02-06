import { cn } from "@src/util";
import { useState } from "react";
import { CodeBlock } from "./CodeBlock";
import { SpotlightItem } from "./types";

interface CodeBlockTabsProps {
  tabs: NonNullable<SpotlightItem["codeSnippetTabs"]>;
  className?: string;
}

export function CodeBlockTabs({ tabs, className }: CodeBlockTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const showHeader = tabs.length > 1;
  const currentTab = tabs[activeTabIndex];

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-[#F8FAFC] dark:border-gray-800 dark:bg-[#0d1117]",
        className,
      )}>
      {showHeader && (
        <div className="flex border-b border-slate-200 bg-slate-100 px-2 dark:border-gray-800 dark:bg-[#161b22]">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTabIndex(index)}
              className={`relative px-4 py-3 text-xs font-medium transition-colors ${
                activeTabIndex === index
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}>
              {tab.label}
              {activeTabIndex === index && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)] dark:bg-blue-400 dark:shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
              )}
            </button>
          ))}
        </div>
      )}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <CodeBlock snippet={currentTab} className="h-full rounded-none border-0 shadow-none" />
      </div>
    </div>
  );
}
