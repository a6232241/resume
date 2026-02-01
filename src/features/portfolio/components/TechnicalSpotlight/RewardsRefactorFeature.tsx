import { AlertTriangle } from "lucide-react";
import { CodeBlockTabs } from "./CodeBlockTabs";
import { DecisionsBlock } from "./DecisionsBlock";
import { ListBlock } from "./ListBlock";
import { ResultBlock } from "./ResultBlock";
import { ShowcaseBlock } from "./ShowcaseBlock";
import { SpotlightItem } from "./types";

interface RewardsRefactorFeatureProps {
  item: SpotlightItem;
}

export function RewardsRefactorFeature({ item }: RewardsRefactorFeatureProps) {
  const { challenge, decisions, result, codeSnippetTabs, showcase } = item;

  return (
    <div className="flex flex-col gap-8">
      {/* 1. Summary Layer */}
      <div className="space-y-4">
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
        <p className="text-lg leading-relaxed font-bold text-gray-900 dark:text-gray-100">{item.summary}</p>
      </div>

      {/* 2. Logic Layer */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        {/* Left Column: Challenge -> Decisions */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <ListBlock block={challenge} color="red" fallbackTitle="Challenge" icon={AlertTriangle} />
          {decisions && <DecisionsBlock block={decisions} />}
        </div>

        {/* Right Column: Code Snippet */}
        {codeSnippetTabs && (
          <div className="flex min-w-0 flex-1 flex-col">
            <CodeBlockTabs tabs={codeSnippetTabs} className="h-full" />
          </div>
        )}
      </div>

      {/* 3. Result Layer */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col">
          <ResultBlock block={result} className="h-full" />
        </div>

        {showcase && (
          <div className="flex min-w-0 flex-1 flex-col">
            <ShowcaseBlock showcase={showcase} />
          </div>
        )}
      </div>
    </div>
  );
}

