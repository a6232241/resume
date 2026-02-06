import { cn } from "@src/util/cn";
import { LucideIcon } from "lucide-react";
import { ListBlock as ListBlockData } from "./types";

interface ListBlockProps {
  block: ListBlockData | undefined;
  color: "red" | "yellow" | "green";
  fallbackTitle: string;
  icon: LucideIcon;
}

export const ListBlock = ({ block, color, fallbackTitle, icon: Icon }: ListBlockProps) => {
  if (!block) return null;

  const colorStyles = {
    red: "border-red-200 bg-red-500/10 border-l-4 border-l-red-500 text-red-900 dark:border-red-900/30 dark:bg-red-900/10 dark:text-red-200 dark:border-l-red-500",
    yellow:
      "border-yellow-200 bg-yellow-500/10 border-l-4 border-l-yellow-500 text-yellow-900 dark:border-yellow-900/30 dark:bg-yellow-900/10 dark:text-yellow-200 dark:border-l-yellow-500",
    green:
      "border-emerald-200 bg-emerald-500/10 border-l-4 border-l-emerald-500 text-emerald-900 dark:border-emerald-900/30 dark:bg-emerald-900/10 dark:text-emerald-200 dark:border-l-emerald-500",
  };

  const headerStyles = {
    red: "text-red-700 dark:text-red-400 bg-red-500/10 dark:bg-red-900/30",
    yellow: "text-yellow-700 dark:text-yellow-400 bg-yellow-500/10 dark:bg-yellow-900/30",
    green: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-900/30",
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
        <h4 className="text-base font-bold">{block.title || fallbackTitle}</h4>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {block.items.map((text, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2 text-sm leading-relaxed font-medium text-slate-700 dark:text-slate-200">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current/60" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
