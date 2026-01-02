"use client";

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

interface EvidenceGalleryProps {
  videos: Video[];
  screenshots: Screenshot[];
  references: Reference[];
}

export default function EvidenceGallery({ videos, screenshots, references }: EvidenceGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="mb-12 space-y-8">
      {/* 視頻演示 */}
      <div className="rounded-2xl bg-white p-4 shadow-lg sm:p-8 dark:bg-white/5">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🎬 演示影片</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {videos.map((video) => (
            <div
              key={video.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {video.icon} {video.title}
                  </h3>
                  {video.duration && <span className="text-sm text-gray-500 dark:text-gray-400">{video.duration}</span>}
                </div>
                <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">{video.description}</p>
                {(video.performance || video.result) && (
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    {video.performance || video.result}
                  </p>
                )}
              </div>
              <video controls className="min-h-[200px] w-full" preload="metadata">
                <source src={video.fileUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {video.watchPoint && (
                <div className="border-t border-gray-200 bg-blue-50 px-4 py-3 dark:border-gray-700 dark:bg-blue-900/20">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    👁️ 觀察重點：{video.watchPoint}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 截圖證據 */}
      {screenshots.length > 0 && (
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 技術截圖</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {screenshots.map((screenshot) => (
              <div
                key={screenshot.id}
                className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-transform hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
                onClick={() => setSelectedImage(screenshot.imageUrl)}>
                <img src={screenshot.imageUrl} alt={screenshot.title} className="h-40 w-full object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {screenshot.icon} {screenshot.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{screenshot.shows}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 大圖模態框 */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full size" className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain" />
          <button
            className="absolute top-4 right-4 text-3xl text-white hover:text-gray-300"
            onClick={() => setSelectedImage(null)}>
            ✕
          </button>
        </div>
      )}

      {/* 參考資源 */}
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

