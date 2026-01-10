import { useState } from "react";
import { highlightCode } from "./helper";

const TAB_LABELS = ["JS Layer", "Android Layer", "iOS Layer"];

export function TabbedCodeBlock({
  filePaths,
  codeSnippets,
  multiHighlightTerms,
}: {
  filePaths: string[];
  codeSnippets: string[];
  multiHighlightTerms: string[][];
}) {
  const [activeTab, setActiveTab] = useState(0);

  const currentHighlightTerms = multiHighlightTerms.length > 0 ? multiHighlightTerms[activeTab] : [];

  return (
    <div className="overflow-hidden rounded-lg bg-gray-950">
      {/* Tab Headers with File Paths as Tags */}
      <div className="flex flex-col gap-2 border-b border-gray-800 bg-gray-900 px-4 py-3">
        {/* File Path Tags */}
        <div className="flex flex-wrap gap-1.5">
          {filePaths.map((path, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-md bg-gray-800 px-2 py-0.5 text-xs text-gray-400">
              <span className="text-gray-500">📄</span>
              {path}
            </span>
          ))}
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1">
          {codeSnippets.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                activeTab === index
                  ? "bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300"
              }`}>
              {TAB_LABELS[index] || `Tab ${index + 1}`}
            </button>
          ))}
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm text-gray-300">
          <code>{highlightCode(codeSnippets[activeTab], currentHighlightTerms)}</code>
        </pre>
      </div>
    </div>
  );
}

