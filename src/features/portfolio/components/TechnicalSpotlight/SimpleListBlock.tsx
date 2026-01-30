import { ContentBlock } from "./types";

export function SimpleListBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
      <ul className="space-y-2">
        {block.items?.map((item, i) => {
          // Ensure we are handling string items for list type
          if (typeof item !== "string") return null;

          return (
            <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
              <span
                dangerouslySetInnerHTML={{
                  __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900 dark:text-white">$1</strong>'),
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

