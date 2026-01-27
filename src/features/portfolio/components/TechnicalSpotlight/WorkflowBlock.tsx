import { ContentBlock } from "./types";

export function WorkflowBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
      <div className="relative flex flex-col gap-4 md:flex-row">
        {block.steps?.map((step, i) => (
          <div key={i} className="flex flex-1 flex-col gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
              {step.step}
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">{step.title}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

