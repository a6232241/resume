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
        "flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] shadow-xl",
        className,
      )}>
      {showHeader && (
        <div className="flex border-b border-gray-800 bg-[#161b22] px-2">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              onClick={() => setActiveTabIndex(index)}
              className={`relative px-4 py-3 text-xs font-medium transition-colors ${
                activeTabIndex === index ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
              }`}>
              {tab.label}
              {activeTabIndex === index && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
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

