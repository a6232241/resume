import { AlertTriangle, Info } from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { DecisionBlock } from "./DecisionBlock";
import { ListBlock } from "./ListBlock";
import { ResultBlock } from "./ResultBlock";
import { SpotlightItem } from "./types";

interface AppClipFeatureProps {
  item: SpotlightItem;
}

export function AppClipFeature({ item }: AppClipFeatureProps) {
  const { challenge, analysis, decision, result, codeSnippet } = item;

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
          <ListBlock block={challenge} color="red" fallbackTitle="Challenge" icon={AlertTriangle} />
          <ListBlock block={analysis} color="yellow" fallbackTitle="Analysis" icon={Info} />
          <DecisionBlock block={decision} />
        </div>

        {/* Right Column: Code Snippet */}
        {codeSnippet && <CodeBlock snippet={codeSnippet} />}
      </div>

      {/* 3. Result Layer */}
      <ResultBlock block={result} />
    </div>
  );
}

