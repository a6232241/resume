import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["overview"]>;
}

export default function ProjectOverview({ data }: Props) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold">項目概況</h2>

      {/* 基本信息網格 */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">⏱️ 項目周期</div>
          <div className="text-2xl font-bold">{data.duration}</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">👤 團隊構成</div>
          <div className="text-lg font-bold">{data.team}</div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">🎯 項目類型</div>
          <div className="text-lg font-bold">{data.projectType}</div>
        </div>
      </div>

      {/* 技術棧 */}
      <div className="space-y-3">
        <h3 className="font-semibold">🛠️ 主要技術</h3>
        <div className="flex flex-wrap gap-2">
          {data.mainTechs?.map((tech) => (
            <span
              key={tech}
              className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 平台 */}
      <div className="space-y-3">
        <h3 className="font-semibold">📱 目標平台</h3>
        <div className="flex flex-wrap gap-2">
          {data.platforms?.map((platform) => (
            <span
              key={platform}
              className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {platform}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
