"use client";

/**
 * Overview data structure for the project
 */
interface OverviewData {
  /** Project duration */
  duration: string;
  /** Team composition */
  team: string;
  /** Type of project */
  projectType: string;
  /** Focus areas */
  focus: string;
  /** Main technologies used */
  mainTechs: string[];
  /** Supported platforms */
  platforms: string[];
}

/**
 * Props for the MusicPlayerOverview component
 */
interface MusicPlayerOverviewProps {
  /** Overview data object */
  overview: OverviewData;
}

/**
 * MusicPlayerOverview Component
 *
 * Displays project overview information in a glassmorphism-styled
 * card with backdrop blur effect. Shows duration, team, project type,
 * focus areas, tech stack, and platforms.
 */
export default function MusicPlayerOverview({ overview }: MusicPlayerOverviewProps) {
  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📊 專案概覽</h2>

        {/* Main Info Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {/* Duration */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">⏱️ 專案週期</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.duration}</p>
          </div>

          {/* Team */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">👤 團隊構成</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.team}</p>
          </div>

          {/* Project Type */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">🎯 專案類型</p>
            <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{overview.projectType}</p>
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">🛠️ 技術棧</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {overview.mainTechs.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Focus Areas */}
        {overview.focus && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">🎯 開發焦點</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {overview.focus.split(", ").map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-900/50 dark:text-orange-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Platforms */}
        {overview.platforms && overview.platforms.length > 0 && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">📱 支援平台</p>
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

