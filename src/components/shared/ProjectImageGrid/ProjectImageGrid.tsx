"use client";

import { LightBox, type LightBoxMediaItem } from "@components/ui";
import { useState } from "react";
import { ProjectImageItem } from "../ProjectImageItem";

export interface ProjectImageGridItem {
  /** 媒體類型 */
  type: "image" | "video";
  /** 媒體來源 URL */
  src: string;
  /** 替代文字 */
  alt: string;
  /** 標題 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 狀態標籤 - 用於技術優化比對 (before/after) */
  status?: "before" | "after";
}

export interface ProjectImageGridProps {
  title?: string;
  items: ProjectImageGridItem[];
  className?: string;
  itemAspectRatio?: string;
  accentColor?: "purple" | "orange" | "blue";
}

export function ProjectImageGrid({
  title,
  items,
  className = "",
  itemAspectRatio = "aspect-video",
  accentColor = "purple",
}: ProjectImageGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const lightBoxMediaItems: LightBoxMediaItem[] = items.map((item) => ({
    type: item.type,
    url: item.src,
    title: item.title,
    description: item.description,
  }));

  return (
    <>
      <div className={className}>
        {title && <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <ProjectImageItem
              key={index}
              type={item.type}
              src={item.src}
              alt={item.alt}
              title={item.title}
              description={item.description}
              aspectRatio={itemAspectRatio}
              accentColor={accentColor}
              status={item.status}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </div>

      <LightBox
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        mediaItems={lightBoxMediaItems}
        currentIndex={selectedIndex ?? 0}
        onNavigate={setSelectedIndex}
        loop
        showCaption
      />
    </>
  );
}

