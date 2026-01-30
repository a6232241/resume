import { cn } from "@src/util/cn";
import { AlertTriangle, Info } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { DecisionBlock } from "./DecisionBlock";
import { ResultBlock } from "./ResultBlock";
import { ContentBlock, SpotlightItem } from "./types";

interface AppClipFeatureProps {
  item: SpotlightItem;
}

export function AppClipFeature({ item }: AppClipFeatureProps) {
  const { blocks } = item;
  const challengeBlock = blocks[0];
  const analysisBlock = blocks[1];
  const decisionBlock = blocks[2];
  const resultBlock = blocks[3];

  const renderListItems = (items: ContentBlock["items"]) => {
    if (!items) return null;

    if (Array.isArray(items) && typeof items[0] === "string") {
      return (
        <ul className="flex flex-col gap-2">
          {(items as string[]).map((text, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed font-medium text-slate-200">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current/60" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  const renderBlock = (
    block: ContentBlock | undefined,
    color: "red" | "yellow" | "green",
    fallbackTitle: string,
    Icon: typeof AlertTriangle,
  ) => {
    const colorStyles = {
      red: "border-red-200/30 bg-red-50/50 text-red-900 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-200",
      yellow:
        "border-yellow-200/30 bg-yellow-50/50 text-yellow-900 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-200",
      green:
        "border-green-200/30 bg-green-50/50 text-green-900 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-200",
    };

    const headerStyles = {
      red: "text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-900/30",
      yellow: "text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30",
      green: "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30",
    };

    return (
      <div className={cn("relative overflow-hidden rounded-xl border p-5", colorStyles[color])}>
        <div className={cn("mb-3 flex items-center gap-3", headerStyles[color].split(" ").slice(0, 2).join(" "))}>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg",
              headerStyles[color].split(" ").slice(2).join(" "),
            )}>
            <Icon className="h-4 w-4" />
          </div>
          <h4 className="text-base font-bold">{block?.title || fallbackTitle}</h4>
        </div>
        <div>
          {Array.isArray(block?.items) ? (
            renderListItems(block.items)
          ) : (
            <p className="text-sm opacity-50">Content format error</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Summary Layer */}
      <div className="space-y-4">
        {/* Tag Cloud */}
        {item.tags && (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {tag}
              </span>
            ))}
          </div>
        )}
        {/* Key Sentence */}
        <p className="text-lg leading-relaxed font-bold text-gray-900 dark:text-gray-100">{item.summary}</p>
      </div>

      {/* 2. Logic Layer */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left Column: Challenge -> Analysis -> Decision */}
        <div className="flex flex-col gap-4">
          {renderBlock(challengeBlock, "red", "Challenge", AlertTriangle)}
          {renderBlock(analysisBlock, "yellow", "Analysis", Info)}
          {decisionBlock && <DecisionBlock block={decisionBlock} />}
        </div>

        {/* Right Column: Code Snippet */}
        {item.codeSnippet && <CodeBlock snippet={item.codeSnippet} />}
      </div>

      {/* 3. Result Layer */}
      {resultBlock && <ResultBlock block={resultBlock} />}
    </div>
  );
}

