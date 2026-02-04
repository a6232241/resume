"use client";

import { ProjectImageItem, type ProjectImageGridItem } from "@components/shared/ProjectImageItem";
import { LightBox, type LightBoxMediaItem } from "@components/ui";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export interface ShowcaseGalleryProps {
  title?: string;
  items: ProjectImageGridItem[];
  className?: string;
  itemAspectRatio?: string;
  accentColor?: "purple" | "orange" | "blue" | "red" | "green";
}

export function ShowcaseGallery({
  title,
  items,
  className = "",
  itemAspectRatio = "aspect-video",
  accentColor = "purple",
}: ShowcaseGalleryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Default show 3 items, or all if expanded
  const displayedItems = isExpanded ? items : items.slice(0, 3);
  const hasMore = items.length > 3;

  const lightBoxMediaItems: LightBoxMediaItem[] = items.map((item) => ({
    type: item.type,
    url: item.src,
    title: item.title,
    description: item.description,
  }));

  return (
    <section className={`flex flex-col gap-8 ${className}`}>
      {title && <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.src}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}>
              <ProjectImageItem
                type={item.type}
                src={item.src}
                alt={item.alt}
                title={item.title}
                description={item.description}
                aspectRatio={itemAspectRatio}
                accentColor={accentColor}
                status={item.status}
                comment={item.comment}
                onClick={() => setSelectedIndex(index)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!isExpanded && hasMore && (
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-4 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
          <span>Show More Projects</span>
          <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        </button>
      )}

      <LightBox
        isOpen={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
        mediaItems={lightBoxMediaItems}
        currentIndex={selectedIndex ?? 0}
        onNavigate={setSelectedIndex}
        loop
        showCaption
      />
    </section>
  );
}
