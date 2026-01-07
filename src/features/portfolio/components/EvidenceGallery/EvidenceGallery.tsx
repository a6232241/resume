"use client";

import { ProjectImageGrid, type ProjectImageGridItem } from "@components/shared";
import { getVideoMimeType } from "@src/util";
import { useState } from "react";

interface Video {
  id: number;
  title: string;
  duration?: string;
  description: string;
  performance?: string;
  result?: string;
  fileUrl: string;
  icon: string;
  watchPoint?: string;
}

interface Screenshot {
  id: number;
  title: string;
  type: string;
  shows: string;
  imageUrl: string;
  icon: string;
}

interface Reference {
  title: string;
  description: string;
  url: string;
  icon: string;
}

export interface EvidenceGalleryProps {
  videos: Video[];
  screenshots: Screenshot[];
  references: Reference[];
}

export function EvidenceGallery({ videos, screenshots, references }: EvidenceGalleryProps) {
  const [activeTab, setActiveTab] = useState<"login" | "navigation" | "state">("login");

  const tabs: { id: "login" | "navigation" | "state"; label: string; icon: string }[] = [
    { id: "login", label: "登入流程 (Login Flow)", icon: "🔐" },
    { id: "navigation", label: "多頁導航 (Navigation)", icon: "🧭" },
    { id: "state", label: "狀態同步 (State Sync)", icon: "🔄" },
  ];

  const screenshotItems: ProjectImageGridItem[] = screenshots.map((s) => ({
    type: "image" as const,
    src: s.imageUrl,
    alt: s.title,
    title: `${s.icon} ${s.title}`,
    description: s.shows,
  }));

  return (
    <section className="space-y-8">
      {/* --- 視頻演示 --- */}
      <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-8 dark:bg-white/5">
        <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎬 演示影片</h2>
          <div className="flex w-full overflow-x-auto rounded-lg bg-gray-100 p-1 md:w-auto dark:bg-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}>
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "login" && (
          <div className="animate-fadeIn">
            <h3 className="mb-4 text-xl font-bold text-blue-600 dark:text-blue-400">
              A. 登入流程優化 (Login Flow Optimization)
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl border-2 border-red-200 bg-gray-50 dark:border-red-700 dark:bg-gray-800">
                <div className="relative p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {videos?.[0]?.icon} {videos?.[0]?.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{videos?.[0]?.description}</p>
                  <div className="absolute top-3 right-3 z-10 rounded-lg bg-red-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span className="text-sm font-bold text-white">Before (10s+)</span>
                  </div>
                </div>
                <div className="relative">
                  {videos?.[0]?.fileUrl && (
                    <video controls className="min-h-[200px] w-full" preload="metadata">
                      <source src={videos[0].fileUrl} type={getVideoMimeType(videos[0].fileUrl)} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                {videos?.[0]?.watchPoint && (
                  <div className="border-t border-gray-200 bg-blue-50 px-4 py-3 dark:border-gray-700 dark:bg-blue-900/20">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">👁️ {videos[0].watchPoint}</p>
                  </div>
                )}
              </div>

              <div className="overflow-hidden rounded-xl border-2 border-green-200 bg-gray-50 dark:border-green-700 dark:bg-gray-800">
                <div className="relative p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {videos?.[1]?.icon} {videos?.[1]?.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{videos?.[1]?.description}</p>
                  <div className="absolute top-3 right-3 z-10 rounded-lg bg-green-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span className="text-sm font-bold text-white">After (~1s)</span>
                  </div>
                </div>
                <div className="relative">
                  {videos?.[1]?.fileUrl && (
                    <video controls className="min-h-[200px] w-full" preload="metadata">
                      <source src={videos[1].fileUrl} type={getVideoMimeType(videos[1].fileUrl)} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                {videos?.[1]?.watchPoint && (
                  <div className="border-t border-gray-200 bg-blue-50 px-4 py-3 dark:border-gray-700 dark:bg-blue-900/20">
                    <p className="text-sm font-medium text-blue-700 dark:text-blue-300">👁️ {videos[1].watchPoint}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "navigation" && (
          <div className="animate-fadeIn">
            <h3 className="mb-4 text-xl font-bold text-purple-600 dark:text-purple-400">
              B. 頁面導航切換 (Navigation Optimization)
            </h3>

            <div className="mb-6">
              <h4 className="mb-3 text-base font-semibold text-gray-700 dark:text-gray-300">createSelector 優化</h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-xl border-2 border-red-200 bg-gray-50 dark:border-red-700 dark:bg-gray-800">
                  <div className="relative p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {videos?.[2]?.icon} {videos?.[2]?.title}
                    </h5>
                    <div className="absolute top-3 right-3 z-10 rounded-lg bg-red-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                      <span className="text-sm font-bold text-white">Before (4s+)</span>
                    </div>
                  </div>
                  <div className="relative">
                    {videos?.[2]?.fileUrl && (
                      <video controls className="min-h-[200px] w-full" preload="metadata">
                        <source src={videos[2].fileUrl} type={getVideoMimeType(videos[2].fileUrl)} />
                      </video>
                    )}
                  </div>
                  {videos?.[2]?.watchPoint && (
                    <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">👁️ {videos[2].watchPoint}</div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border-2 border-green-200 bg-gray-50 dark:border-green-700 dark:bg-gray-800">
                  <div className="relative p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {videos?.[3]?.icon} {videos?.[3]?.title}
                    </h5>
                    <div className="absolute top-3 right-3 z-10 rounded-lg bg-green-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                      <span className="text-sm font-bold text-white">After (~1s)</span>
                    </div>
                  </div>
                  <div className="relative">
                    {videos?.[3]?.fileUrl && (
                      <video controls className="min-h-[200px] w-full" preload="metadata">
                        <source src={videos[3].fileUrl} type={getVideoMimeType(videos[3].fileUrl)} />
                      </video>
                    )}
                  </div>
                  {videos?.[3]?.watchPoint && (
                    <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">👁️ {videos[3].watchPoint}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="mb-3 text-base font-semibold text-gray-700 dark:text-gray-300">Redux Toolkit 升級</h4>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="overflow-hidden rounded-xl border-2 border-red-200 bg-gray-50 dark:border-red-700 dark:bg-gray-800">
                  <div className="relative p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {videos?.[4]?.icon} {videos?.[4]?.title}
                    </h5>
                    <div className="absolute top-3 right-3 z-10 rounded-lg bg-red-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                      <span className="text-sm font-bold text-white">Before (4s+)</span>
                    </div>
                  </div>
                  <div className="relative">
                    {videos?.[4]?.fileUrl && (
                      <video controls className="min-h-[200px] w-full" preload="metadata">
                        <source src={videos[4].fileUrl} type={getVideoMimeType(videos[4].fileUrl)} />
                      </video>
                    )}
                  </div>
                  {videos?.[4]?.watchPoint && (
                    <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">👁️ {videos[4].watchPoint}</div>
                  )}
                </div>

                <div className="overflow-hidden rounded-xl border-2 border-green-200 bg-gray-50 dark:border-green-700 dark:bg-gray-800">
                  <div className="relative p-4">
                    <h5 className="font-semibold text-gray-900 dark:text-white">
                      {videos?.[5]?.icon} {videos?.[5]?.title}
                    </h5>
                    <div className="absolute top-3 right-3 z-10 rounded-lg bg-green-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                      <span className="text-sm font-bold text-white">After (~1s)</span>
                    </div>
                  </div>
                  <div className="relative">
                    {videos?.[5]?.fileUrl && (
                      <video controls className="min-h-[200px] w-full" preload="metadata">
                        <source src={videos[5].fileUrl} type={getVideoMimeType(videos[5].fileUrl)} />
                      </video>
                    )}
                  </div>
                  {videos?.[5]?.watchPoint && (
                    <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">👁️ {videos[5].watchPoint}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "state" && (
          <div className="animate-fadeIn">
            <h3 className="mb-4 text-xl font-bold text-orange-600 dark:text-orange-400">
              C. 狀態同步與更新 (State Sync Fix)
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-xl border-2 border-red-200 bg-gray-50 dark:border-red-700 dark:bg-gray-800">
                <div className="relative p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {videos?.[6]?.icon} {videos?.[6]?.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{videos?.[6]?.description}</p>
                  <div className="absolute top-3 right-3 z-10 rounded-lg bg-red-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span className="text-sm font-bold text-white">Before (Data Loss)</span>
                  </div>
                </div>
                <div className="relative">
                  {videos?.[6]?.fileUrl && (
                    <video controls className="min-h-[200px] w-full" preload="metadata">
                      <source src={videos[6].fileUrl} type={getVideoMimeType(videos[6].fileUrl)} />
                    </video>
                  )}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border-2 border-green-200 bg-gray-50 dark:border-green-700 dark:bg-gray-800">
                <div className="relative p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {videos?.[7]?.icon} {videos?.[7]?.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{videos?.[7]?.description}</p>
                  <div className="absolute top-3 right-3 z-10 rounded-lg bg-green-600/90 px-4 py-2 shadow-lg backdrop-blur-sm">
                    <span className="text-sm font-bold text-white">After (Fixed ✅)</span>
                  </div>
                </div>
                <div className="relative">
                  {videos?.[7]?.fileUrl && (
                    <video controls className="min-h-[200px] w-full" preload="metadata">
                      <source src={videos[7].fileUrl} type={getVideoMimeType(videos[7].fileUrl)} />
                    </video>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {screenshots.length > 0 && (
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 技術截圖</h2>
          <ProjectImageGrid items={screenshotItems} itemAspectRatio="aspect-video" accentColor="blue" />
        </div>
      )}

      {references.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg dark:from-blue-900/20 dark:to-indigo-900/20">
          <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">🔗 相關資源</h3>
          <div className="flex flex-wrap gap-4">
            {references.map((ref) => (
              <a
                key={ref.url}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-gray-700 shadow transition-shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300">
                <span>{ref.icon}</span>
                <div>
                  <p className="font-medium">{ref.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{ref.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

