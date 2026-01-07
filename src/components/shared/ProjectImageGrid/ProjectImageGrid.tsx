"use client";

import { LightBox, type LightBoxMediaItem } from "@components/ui";
import { useState } from "react";
import { ProjectImageItem } from "../ProjectImageItem";

export interface ProjectImageGridItem {
  type: "image" | "video";
  src: string;
  alt: string;
  title?: string;
  description?: string;
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

