"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Video evidence data structure
 */
interface VideoEvidence {
  id: number;
  title: string;
  description: string;
  fileUrl: string;
}

/**
 * Screenshot evidence data structure
 */
interface ScreenshotEvidence {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * Props for the MusicPlayerEvidence component
 */
interface MusicPlayerEvidenceProps {
  /** Array of video evidence */
  videos: VideoEvidence[];
  /** Array of screenshot evidence */
  screenshots: ScreenshotEvidence[];
}

/**
 * MusicPlayerEvidence Component
 *
 * Displays App screenshots and videos in a 3-column grid layout.
 * Clicking on an item opens a lightbox with navigation controls.
 * Supports keyboard navigation (Escape to close, arrows to navigate).
 */
export default function MusicPlayerEvidence({ videos, screenshots }: MusicPlayerEvidenceProps) {
  // Combine all media for lightbox navigation
  const allMedia = [
    ...videos.map((v) => ({ ...v, type: "video" as const })),
    ...screenshots.map((s) => ({ ...s, type: "image" as const })),
  ];

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? allMedia.length - 1 : prev - 1) : null));
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null ? (prev === allMedia.length - 1 ? 0 : prev + 1) : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, allMedia.length]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === allMedia.length - 1 ? 0 : prev + 1) : null));
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? allMedia.length - 1 : prev - 1) : null));
  };

  /** Get video MIME type based on file extension */
  const getVideoMimeType = (url: string) => {
    if (url.toLowerCase().endsWith(".mov")) {
      return "video/quicktime";
    }
    return "video/mp4";
  };

  return (
    <section className="mb-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur-sm">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 App 展示</h2>

        {/* Video Section */}
        {videos.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold text-purple-400">🎬 功能演示</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 transition-all hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-lg"
                  onClick={() => setSelectedIndex(index)}>
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                    <video className="h-full w-full object-cover" preload="metadata" muted>
                      <source src={video.fileUrl} type={getVideoMimeType(video.fileUrl)} />
                    </video>
                    {/* Play overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <div className="rounded-full bg-purple-500/80 p-4">
                        <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Video badge */}
                    <div className="absolute top-2 right-2 rounded bg-purple-500/80 px-2 py-1 text-xs font-medium text-white">
                      Video
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <h4 className="truncate font-semibold text-white">{video.title}</h4>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-400">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Screenshot Section */}
        {screenshots.length > 0 && (
          <div>
            <h3 className="mb-4 text-lg font-semibold text-orange-400">📱 App 截圖</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {screenshots.map((screenshot, index) => (
                <div
                  key={screenshot.id}
                  className="group relative cursor-pointer overflow-hidden rounded-xl border border-gray-700 bg-gray-800 transition-all hover:scale-[1.02] hover:border-orange-500/50 hover:shadow-lg"
                  onClick={() => setSelectedIndex(videos.length + index)}>
                  {/* Image Thumbnail */}
                  <div className="relative aspect-[9/16] w-full overflow-hidden bg-gray-900">
                    <Image
                      src={screenshot.imageUrl}
                      alt={screenshot.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Zoom overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                      <div className="rounded bg-black/60 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                        🔍 點擊放大
                      </div>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-3">
                    <h4 className="truncate font-semibold text-white">{screenshot.title}</h4>
                    <p className="mt-1 line-clamp-1 text-sm text-gray-400">{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && allMedia[selectedIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}>
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            onClick={() => setSelectedIndex(null)}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20"
            onClick={handlePrev}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Main Content */}
          <div
            className="relative flex h-[90vh] w-full max-w-5xl flex-col items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}>
            {allMedia[selectedIndex].type === "video" ? (
              // Video player
              <div className="relative h-full w-full">
                <video controls autoPlay className="h-full w-full object-contain" preload="metadata">
                  <source
                    src={(allMedia[selectedIndex] as VideoEvidence & { type: "video" }).fileUrl}
                    type={getVideoMimeType((allMedia[selectedIndex] as VideoEvidence & { type: "video" }).fileUrl)}
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              // Image display
              <div className="relative h-full w-full">
                <Image
                  src={(allMedia[selectedIndex] as ScreenshotEvidence & { type: "image" }).imageUrl}
                  alt={allMedia[selectedIndex].title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            )}

            {/* Caption Overlay */}
            <div className="absolute right-0 bottom-8 left-0 mx-auto max-w-2xl rounded-xl bg-black/60 p-4 text-center text-white backdrop-blur-md">
              <h3 className="text-xl font-bold">{allMedia[selectedIndex].title}</h3>
              <p className="mt-2 text-sm text-gray-200">{allMedia[selectedIndex].description}</p>
              <div className="mt-2 text-xs text-gray-400">
                ({selectedIndex + 1} / {allMedia.length})
              </div>
            </div>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20"
            onClick={handleNext}>
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}

