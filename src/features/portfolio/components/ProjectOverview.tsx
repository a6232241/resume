"use client";

import { cn } from "@src/util";
import { Globe, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

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
  description?: ReactNode;
  techBadgeColor?: "blue" | "purple";
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("web") || p.includes("網頁")) return <Globe size={14} className="mr-1" />;
  if (p.includes("ios") || p.includes("android") || p.includes("app")) return <Smartphone size={14} className="mr-1" />;
  return null;
};

export default function ProjectOverview({ overview, description, techBadgeColor = "blue" }: ProjectOverviewProps) {
  const t = useTranslations("projects");
  // Badge color classes - Updated for more premium feel on purple
  const techBadgeClasses =
    techBadgeColor === "purple"
      ? "bg-purple-100/80 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/30"
      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";

  return (
    <section>
      <div className="rounded-xl bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:bg-gray-800/50">
        <div className="flex flex-col gap-6">
          {description && (
            <div className="max-w-2xl text-left text-lg leading-loose text-gray-700 dark:text-gray-200">
              {description}
            </div>
          )}

          {/* Integrated Info Bar */}
          <div
            className={cn(
              "flex flex-col gap-4 md:flex-row md:items-start md:gap-8 dark:border-gray-700",
              description ? "border-t border-gray-200 pt-6" : "",
            )}>
            <div className="flex items-center">
              <div>
                <p className="mb-0.5 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  {t("employmentTime")}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">{overview.duration}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <p className="mb-0.5 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t("teamSize")}</p>
                <p className="font-semibold text-gray-900 dark:text-white">{overview.team}</p>
              </div>
            </div>

            <div className="flex items-center">
              <div>
                <p className="mb-0.5 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                  {t("projectType")}
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">{overview.projectType}</p>
              </div>
            </div>

            {/* --- Platforms --- */}
            {overview.platforms && overview.platforms.length > 0 && (
              <div className="flex items-center">
                <div>
                  <p className="mb-0.5 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    {t("platforms")}
                  </p>
                  <div className="flex items-center gap-2">
                    {overview.platforms.map((p) => (
                      <div
                        key={p}
                        className="flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {getPlatformIcon(p)}
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack - With explicit wrapping prevention for orphans if possible, or just standard flexible wrap */}
            <div className="flex flex-col gap-1 md:ml-auto md:max-w-md md:items-end">
              <p className="mb-0.5 text-xs font-medium text-gray-500 uppercase dark:text-gray-400">{t("techStack")}</p>
              <div className="flex flex-wrap gap-1.5 md:justify-end">
                {overview.mainTechs.map((tech) => (
                  <span key={tech} className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${techBadgeClasses}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

