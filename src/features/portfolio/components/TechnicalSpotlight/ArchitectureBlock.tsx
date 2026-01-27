import { ContentBlock } from "./types";

export function ArchitectureBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
      <div className="flex flex-col gap-2">
        {block.layers?.map((layer, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded border border-gray-200 p-3 shadow-sm dark:border-gray-700">
            <div className="w-32 font-bold text-gray-900 dark:text-white">{layer.name}</div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">{layer.desc}</div>
            <div className="text-xs font-semibold tracking-wide text-purple-600 uppercase dark:text-purple-400">
              {layer.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

