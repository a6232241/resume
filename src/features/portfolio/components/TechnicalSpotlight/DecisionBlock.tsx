import { cn } from "@src/util/cn";
import { CheckCircle2 } from "lucide-react";
import { ContentBlock, DecisionBlock as DecisionBlockType } from "./types";

interface DecisionBlockProps {
  block: ContentBlock | DecisionBlockType;
}

export function DecisionBlock({ block }: DecisionBlockProps) {
  const items = block.items;

  // Green styling constants
  const containerClass =
    "border-green-200/30 bg-green-50/50 text-green-900 dark:border-green-900/30 dark:bg-green-900/10 dark:text-green-200";
  const iconBgClass = "text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30";

  const renderContent = () => {
    if (!items) return null;

    if (Array.isArray(items) && typeof items[0] === "string") {
      return (
        <ul className="flex flex-col gap-2">
          {(items as string[]).map((text, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed font-medium">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current/60" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      );
    }

    // Handle structured items (e.g. Engineering Decision with Highlights)
    const decisionItems = items as Array<{
      title?: string;
      desc?: string;
      highlight?: boolean;
      badge?: string;
    }>;

    return (
      <div className="flex flex-col gap-3">
        {decisionItems.map((item, idx) => (
          <div
            key={idx}
            className={cn(
              "rounded-lg p-3 transition-colors",
              item.highlight ? "-mx-3 border border-emerald-500/20 bg-emerald-500/10" : "",
            )}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h5 className={cn("text-sm font-bold", item.highlight ? "text-emerald-400" : "text-slate-300")}>
                  {item.title}
                </h5>
                <p className="text-xs leading-relaxed text-slate-400">{item.desc}</p>
              </div>
              {item.badge && (
                <span className="shrink-0 rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("relative overflow-hidden rounded-xl border p-5", containerClass)}>
      <div className="mb-3 flex items-center gap-3">
        <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", iconBgClass)}>
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <h4 className="text-base font-bold">{block.title || "Decision"}</h4>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

