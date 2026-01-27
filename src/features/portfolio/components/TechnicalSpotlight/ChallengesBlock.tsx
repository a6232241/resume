import { ContentBlock } from "./types";

export function ChallengesBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
      <div className="flex flex-col gap-4">
        {block.items?.map((item, i) => {
          if (typeof item === "string") return null;
          return (
            <div
              key={i}
              className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/20">
              <h5 className="mb-2 font-bold text-gray-900 dark:text-white">{item.title}</h5>
              <div className="grid gap-2 text-sm sm:grid-cols-[auto_1fr]">
                <span className="font-semibold text-red-500">Symptom</span>
                <span className="text-gray-600 dark:text-gray-400">{item.symptom}</span>
                <span className="font-semibold text-blue-500">Solution</span>
                <span className="text-gray-600 dark:text-gray-400">{item.solution}</span>
                <span className="font-semibold text-green-500">Result</span>
                <span className="text-gray-600 dark:text-gray-400">{item.result}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

