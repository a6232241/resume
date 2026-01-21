"use client";

import { ProjectImageGrid, ProjectImageItem, type ProjectImageGridItem } from "@components/shared";
import { LightBox, type LightBoxMediaItem } from "@components/ui";
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
  const [lightBoxIndex, setLightBoxIndex] = useState<number | null>(null);

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

  const lightBoxMediaItems: LightBoxMediaItem[] = videos.map((v) => ({
    type: "video",
    url: v.fileUrl,
    title: `${v.icon} ${v.title}`,
    description: v.watchPoint ? `${v.description}\n\n👁️ Watch Point: ${v.watchPoint}` : v.description,
  }));

  const renderVideoItem = (index: number, status: "before" | "after") => {
    const video = videos[index];
    if (!video) return null;

    // 將 watchPoint 加入描述中最前頭以便預覽，或者最後
    const desc = video.watchPoint ? `👁️ ${video.watchPoint} — ${video.description}` : video.description;

    return (
      <ProjectImageItem
        type="video"
        src={video.fileUrl}
        alt={video.title}
        title={`${video.icon} ${video.title}`}
        description={desc}
        status={status}
        onClick={() => setLightBoxIndex(index)}
      />
    );
  };

  return (
    <>
      <section className="space-y-8">
        {/* --- 視頻演示 --- */}
        <div className="rounded-2xl bg-white p-4 shadow-lg backdrop-blur-sm sm:p-8 dark:bg-white/5">
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
                {renderVideoItem(0, "before")}
                {renderVideoItem(1, "after")}
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
                  {renderVideoItem(2, "before")}
                  {renderVideoItem(3, "after")}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-semibold text-gray-700 dark:text-gray-300">Redux Toolkit 升級</h4>
                <div className="grid gap-6 md:grid-cols-2">
                  {renderVideoItem(4, "before")}
                  {renderVideoItem(5, "after")}
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
                {renderVideoItem(6, "before")}
                {renderVideoItem(7, "after")}
              </div>
            </div>
          )}
        </div>

        {screenshots.length > 0 && (
          <div className="rounded-2xl bg-white p-8 shadow-lg backdrop-blur-sm dark:bg-white/5">
            <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 技術截圖</h2>
            <ProjectImageGrid items={screenshotItems} itemAspectRatio="aspect-video" accentColor="blue" />
          </div>
        )}

        {references.length > 0 && (
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg backdrop-blur-sm dark:from-blue-900/20 dark:to-indigo-900/20">
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

      <LightBox
        isOpen={lightBoxIndex !== null}
        onClose={() => setLightBoxIndex(null)}
        mediaItems={lightBoxMediaItems}
        currentIndex={lightBoxIndex ?? 0}
        onNavigate={setLightBoxIndex}
        loop
        showCaption
      />
    </>
  );
}

