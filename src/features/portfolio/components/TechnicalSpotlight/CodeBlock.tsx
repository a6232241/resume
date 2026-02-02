import { cn } from "@src/util/cn";
import { Info } from "lucide-react";
import { CodeSnippet } from "./types";

interface CodeBlockProps {
  snippet: CodeSnippet;
  className?: string; // Optional for positioning similar to AppClipFeature usage if needed
}

export function CodeBlock({ snippet, className }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#0d1117] shadow-xl",
        className,
      )}>
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-gray-800/50 bg-[#161b22] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span className="font-medium text-purple-400">{snippet.title}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span className="uppercase">{snippet.language}</span>
        </div>
      </div>

      {/* Code Content - Scrollable Area */}
      <div className="custom-scrollbar flex-1 overflow-auto p-4 md:p-6">
        <pre className="w-fit min-w-full font-mono text-[0.8rem] leading-relaxed">
          {snippet.code.split("\n").map((line, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = snippet.highlights?.includes(lineNum);
            const tooltip = snippet.tooltips?.find((t) => t.line === lineNum);

            return (
              <div
                key={idx}
                className={cn(
                  "relative -mx-6 flex px-6 py-0.5 transition-colors duration-200",
                  isHighlighted ? "bg-yellow-500/10" : "transparent",
                )}>
                {/* Line Number */}
                <span className="mr-4 inline-block w-6 shrink-0 text-right text-gray-600 select-none">{lineNum}</span>

                {/* Code */}
                <span
                  className={cn("flex-1 break-words whitespace-pre text-gray-300", isHighlighted && "text-yellow-100")}>
                  {line}
                </span>

                {/* Tooltip */}
                {tooltip && (
                  <div className="group/tooltip absolute top-[50%] left-2 z-10 hidden translate-y-[-50%] items-center md:flex">
                    <Info className="h-3.5 w-3.5 cursor-help text-gray-500 transition-colors hover:text-purple-400" />
                    <div className="pointer-events-none absolute top-1/2 left-full ml-2 translate-x-2 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover/tooltip:pointer-events-auto group-hover/tooltip:translate-x-0 group-hover/tooltip:opacity-100">
                      <div className="relative rounded-lg border border-gray-700 bg-gray-800 p-2 text-xs text-gray-200 shadow-lg">
                        <div className="absolute top-1/2 -left-1.5 -mt-1.5 h-3 w-3 rotate-[-45deg] border-t border-l border-gray-700 bg-gray-800"></div>
                        {tooltip.content}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

