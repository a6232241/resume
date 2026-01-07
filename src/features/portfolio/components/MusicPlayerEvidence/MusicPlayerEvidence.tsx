"use client";

import { ProjectImageGrid, type ProjectImageGridItem } from "@components/shared";

interface VideoEvidence {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
}

interface ScreenshotEvidence {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface MusicPlayerEvidenceProps {
  videos: VideoEvidence[];
  screenshots: ScreenshotEvidence[];
}

export function MusicPlayerEvidence({ videos, screenshots }: MusicPlayerEvidenceProps) {
  const videoItems: ProjectImageGridItem[] = videos.map((v) => ({
    type: "video" as const,
    src: v.fileUrl,
    alt: v.title,
    title: v.title,
    description: v.description,
  }));

  const screenshotItems: ProjectImageGridItem[] = screenshots.map((s) => ({
    type: "image" as const,
    src: s.imageUrl,
    alt: s.title,
    title: s.title,
    description: s.description,
  }));

  return (
    <section>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 App 展示</h2>

        {videos.length > 0 && (
          <ProjectImageGrid
            title="🎬 功能演示"
            items={videoItems}
            itemAspectRatio="aspect-video"
            accentColor="purple"
            className="mb-8"
          />
        )}

        {screenshots.length > 0 && (
          <ProjectImageGrid
            title="📱 App 截圖"
            items={screenshotItems}
            itemAspectRatio="aspect-[9/16]"
            accentColor="orange"
          />
        )}
      </div>
    </section>
  );
}

