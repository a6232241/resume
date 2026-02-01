import { cn } from "@src/util";
import { CheckCircle2 } from "lucide-react";
import { ContentBlock, ResultBlock as ResultBlockType } from "./types";

interface ResultBlockProps {
  block: ContentBlock | ResultBlockType;
  className?: string;
}

export function ResultBlock({ block, className }: ResultBlockProps) {
  const items = block.items;

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-emerald-900/30 bg-slate-900 p-6", className)}>
      {/* Inner Gradient */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-transparent to-emerald-900/20" />

      <div className="relative h-full">
        <div className="mb-4">
          <h4 className="text-xl font-bold tracking-tight text-white">{block.title || "Result"}</h4>
        </div>
        <div className="text-lg font-semibold text-emerald-100">
          {Array.isArray(items) && typeof items[0] === "string" ? (
            <ul className="flex flex-col gap-3">
              {(items as string[]).map((text, idx) => (
                <li key={idx} className="flex items-start gap-3 opacity-90">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm opacity-50">Content format error</p>
          )}
        </div>
      </div>
    </div>
  );
}

