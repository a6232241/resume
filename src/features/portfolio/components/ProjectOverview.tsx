"use client";

interface OverviewData {
  duration: string;
  team: string;
  projectType: string;
  mainTechs: string[];
  focus?: string[];
  platforms?: string[];
}

interface ProjectOverviewProps {
  overview: OverviewData;
  techBadgeColor?: "blue" | "purple";
  focusBadgeColor?: "purple" | "orange";
}

export default function ProjectOverview({
  overview,
  techBadgeColor = "blue",
  focusBadgeColor = "purple",
}: ProjectOverviewProps) {
  // Badge color classes
  const techBadgeClasses =
    techBadgeColor === "purple"
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

  const focusBadgeClasses =
    focusBadgeColor === "orange"
      ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200"
      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";

  return (
    <section>
      <div className="rounded-2xl border border-white/10 bg-white p-8 shadow-lg dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📊 項目概況</h2>

        {/* --- Main Info Grid --- */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">⏱️ 項目周期</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.duration}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">👤 團隊構成</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.team}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">🎯 項目類型</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.projectType}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">🛠️ 技術棧</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {overview.mainTechs.map((tech) => (
                <span key={tech} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${techBadgeClasses}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* --- Focus Areas --- */}
        {overview.focus && overview.focus.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">🎯 焦點</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {overview.focus.map((item) => (
                <span key={item} className={`rounded-full px-3 py-1 text-sm font-medium ${focusBadgeClasses}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* --- Platforms --- */}
        {overview.platforms && overview.platforms.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">📱 支援平台</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {overview.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

