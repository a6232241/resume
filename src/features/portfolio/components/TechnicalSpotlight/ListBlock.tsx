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
        <h4 className="text-base font-bold">{block.title || fallbackTitle}</h4>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {block.items.map((text, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm leading-relaxed font-medium text-slate-200">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current/60" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

