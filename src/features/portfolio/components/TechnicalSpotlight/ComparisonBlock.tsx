import { ContentBlock } from "./types";

export function ComparisonBlock({ block }: { block: ContentBlock }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {block.headers?.map((h, i) => (
                <th key={i} className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {block.rows?.map((row, i) => (
              <tr key={i} className="bg-white dark:bg-transparent">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

