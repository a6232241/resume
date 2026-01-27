import { ContentBlock } from "./types";

export function GridBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.items?.map((item, i) => {
          if (typeof item === "string") return null;
          return (
            <div key={i} className="flex flex-col gap-2 rounded-lg border border-gray-100 p-4 dark:border-gray-800">
              <div className="text-2xl">{item.icon}</div>
              <h5 className="font-semibold text-gray-900 dark:text-white">{item.title}</h5>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

