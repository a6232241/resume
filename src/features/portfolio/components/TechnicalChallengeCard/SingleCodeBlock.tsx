import { highlightCode } from "./helper";

export function SingleCodeBlock({
  filePath,
  codeSnippet,
  highlightTerms = [],
}: {
  filePath?: string;
  codeSnippet: string;
  highlightTerms?: string[];
}) {
  return (
    <div className="overflow-hidden rounded-lg bg-gray-950">
      {filePath && (
        <div className="flex items-center gap-2 border-b border-gray-800 bg-gray-900 px-4 py-2">
          <span className="text-gray-500">📄</span>
          <code className="text-xs text-gray-400">{filePath}</code>
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm text-gray-300">
          <code>{highlightCode(codeSnippet, highlightTerms)}</code>
        </pre>
      </div>
    </div>
  );
}
