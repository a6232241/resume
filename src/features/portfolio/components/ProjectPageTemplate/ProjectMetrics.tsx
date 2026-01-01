import { ProjectDetailData } from "./types";

interface Props {
  data: NonNullable<ProjectDetailData["metrics"]>;
}

export default function ProjectMetrics({ data }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold">📊 性能指標</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {/* 座標精度 */}
        {data.accuracy && (
          <div className="rounded-lg border-2 border-orange-300 bg-orange-50 p-6 dark:border-orange-700 dark:bg-orange-900/20">
            <h3 className="mb-4 font-semibold text-orange-900 dark:text-orange-300">{data.accuracy.title}</h3>
            <div className="mb-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">改進前：</span>
                <span className="font-mono font-bold">{data.accuracy.before}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">改進後：</span>
                <span className="font-mono font-bold text-green-600 dark:text-green-400">{data.accuracy.after}</span>
              </div>
            </div>
            <div className="rounded bg-orange-100 px-2 py-1 text-center text-sm font-bold text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
              {data.accuracy.improvement}
            </div>
          </div>
        )}

        {/* 渲染流暢度 */}
        {data.performance && (
          <div className="rounded-lg border-2 border-green-300 bg-green-50 p-6 dark:border-green-700 dark:bg-green-900/20">
            <h3 className="mb-4 font-semibold text-green-900 dark:text-green-300">{data.performance.title}</h3>
            <div className="mb-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">改進前：</span>
                <span className="font-mono font-bold">{data.performance.before}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">改進後：</span>
                <span className="font-mono font-bold text-green-600 dark:text-green-400">{data.performance.after}</span>
              </div>
            </div>
            <div className="rounded bg-green-100 px-2 py-1 text-center text-sm font-bold text-green-700 dark:bg-green-900/30 dark:text-green-300">
              {data.performance.improvement}
            </div>
          </div>
        )}

        {/* 開發效率 */}
        {data.development && (
          <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-6 dark:border-blue-700 dark:bg-blue-900/20">
            <h3 className="mb-4 font-semibold text-blue-900 dark:text-blue-300">開發效率</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">C++ 複用率：</span>
                <span className="font-bold">{data.development.cpp_reuse_rate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">開發周期：</span>
                <span className="font-bold">{data.development.timeline}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
