"use client";

import { getVideoMimeType } from "@src/util";
import Image from "next/image";

export interface ProjectImageItemProps {
  /** 媒體類型：圖片或影片 */
  type: "image" | "video";
  /** 媒體來源 URL */
  src: string;
  /** 替代文字 */
  alt: string;
  /** 標題 */
  title?: string;
  /** 描述 */
  description?: string;
  /** 長寬比，預設 aspect-video */
  aspectRatio?: string;
  /** 強調色 */
  accentColor?: "purple" | "orange" | "blue";
  /** 狀態標籤 - 用於技術優化比對 (before/after) */
  status?: "before" | "after";
  /** 點擊事件處理 */
  onClick?: () => void;
}

const accentColorMap = {
  purple: {
    border: "hover:border-purple-500/50",
    badge: "bg-purple-500/80",
  },
  orange: {
    border: "hover:border-orange-500/50",
    badge: "bg-orange-500/80",
  },
  blue: {
    border: "hover:border-blue-500/50",
    badge: "bg-blue-500/80",
  },
};

/** 狀態標籤樣式映射 */
const statusStyleMap = {
  before: {
    container: "border-red-200 dark:border-red-700",
    badge: "bg-red-600/90",
    label: "Before",
  },
  after: {
    container: "border-green-200 dark:border-green-700",
    badge: "bg-green-600/90",
    label: "After",
  },
};

export function ProjectImageItem({
  type,
  src,
  alt,
  title,
  description,
  aspectRatio = "aspect-video",
  accentColor = "purple",
  status,
  onClick,
}: ProjectImageItemProps) {
  const colorStyles = accentColorMap[accentColor];
  const statusStyles = status ? statusStyleMap[status] : null;

  return (
    <div
      className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-gray-50 transition-all hover:scale-[1.02] hover:shadow-lg dark:bg-gray-800 ${colorStyles.border} ${statusStyles ? `border-2 ${statusStyles.container}` : "border border-gray-200 dark:border-gray-700"}`}
      onClick={onClick}>
      {/* Status Badge (Before/After) */}
      {statusStyles && (
        <div
          className={`absolute top-3 left-3 z-20 rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm ${statusStyles.badge}`}>
          <span className="text-sm font-bold text-white">{statusStyles.label}</span>
        </div>
      )}
      <div className={`relative ${aspectRatio} w-full overflow-hidden bg-gray-100 dark:bg-gray-900`}>
        {type === "video" ? (
          <>
            <video className="h-full w-full object-cover" preload="metadata" muted>
              <source src={src} type={getVideoMimeType(src)} />
            </video>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
              <div className={`rounded-full ${colorStyles.badge} p-4`}>
                <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div
              className={`absolute top-2 right-2 rounded ${colorStyles.badge} px-2 py-1 text-xs font-medium text-white`}>
              Video
            </div>
          </>
        ) : (
          <>
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
              <div className="rounded bg-black/60 px-3 py-1.5 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
                🔍 點擊放大
              </div>
            </div>
          </>
        )}
      </div>
      {(title || description) && (
        <div className="p-3">
          {title && <h4 className="truncate font-semibold text-gray-900 dark:text-white">{title}</h4>}
          {description && <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">{description}</p>}
        </div>
      )}
    </div>
  );
}

