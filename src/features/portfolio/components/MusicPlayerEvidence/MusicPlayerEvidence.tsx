"use client";

import { ProjectImageGrid, type ProjectImageGridItem } from "@components/shared";
import { useState } from "react";

/** 影片證據介面 */
interface VideoEvidence {
  title: string;
  desc: string;
  fileUrl: string;
}

/** 截圖證據介面 */
interface ScreenshotEvidence {
  title: string;
  desc: string;
  imageUrl: string;
}

export interface MusicPlayerEvidenceProps {
  videos: VideoEvidence[];
  screenshots: ScreenshotEvidence[];
}

/**
 * Side Project 專用媒體展示組件
 * 使用 Tab 切換「功能演示」與「App 截圖」
 */
export function MusicPlayerEvidence({ videos, screenshots }: MusicPlayerEvidenceProps) {
  const [activeTab, setActiveTab] = useState<"videos" | "screenshots">("videos");

  const videoItems: ProjectImageGridItem[] = videos.map((v) => ({
    type: "video" as const,
    src: v.fileUrl,
    alt: v.title,
    title: v.title,
    description: v.desc,
  }));

  const screenshotItems: ProjectImageGridItem[] = screenshots.map((s) => ({
    type: "image" as const,
    src: s.imageUrl,
    alt: s.title,
    title: s.title,
    description: s.desc,
  }));

  const tabs = [
    { id: "videos" as const, label: "🎬 功能演示", count: videos.length },
    { id: "screenshots" as const, label: "📱 App 截圖", count: screenshots.length },
  ];

  return (
    <section>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 專案展示</h2>

        {/* Tab 導航 */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "border-purple-500 text-purple-600 dark:text-purple-400"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}>
                {tab.label}
                <span
                  className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    activeTab === tab.id
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                  }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab 內容 */}
        {activeTab === "videos" && videos.length > 0 && (
          <ProjectImageGrid items={videoItems} itemAspectRatio="aspect-video" accentColor="purple" />
        )}

        {activeTab === "screenshots" && screenshots.length > 0 && (
          <ProjectImageGrid items={screenshotItems} itemAspectRatio="aspect-[9/16]" accentColor="orange" />
        )}
      </div>
    </section>
  );
}

