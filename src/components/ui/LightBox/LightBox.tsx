"use client";

import { getVideoMimeType } from "@src/util";
import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

/** Supports both simple media items (url + alt) and rich media items (title + description) */
export interface LightBoxMediaItem {
  type: "image" | "video";
  url: StaticImageData | string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface LightBoxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: LightBoxMediaItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  loop?: boolean;
  showCaption?: boolean;
}

export default function LightBox({
  isOpen,
  onClose,
  mediaItems,
  currentIndex,
  onNavigate,
  loop = false,
  showCaption = false,
}: LightBoxProps) {
  const currentItem = mediaItems[currentIndex];

  const handlePrevious = useCallback(() => {
    if (loop) {
      onNavigate(currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1);
    } else if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate, loop, mediaItems.length]);

  const handleNext = useCallback(() => {
    if (loop) {
      onNavigate(currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1);
    } else if (currentIndex < mediaItems.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, mediaItems.length, onNavigate, loop]);

  const getVideoSrc = (url: string | StaticImageData): string => {
    return typeof url === "string" ? url : url.src;
  };

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrevious, handleNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || !currentItem) return null;

  const showPrevButton = loop || currentIndex > 0;
  const showNextButton = loop || currentIndex < mediaItems.length - 1;

  // Use createPortal to render the lightbox at document.body level,
  // bypassing any ancestor's transform/filter/backdrop-filter containing block
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={onClose}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox">
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {showPrevButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute left-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20"
          aria-label="Previous media">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {showNextButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-4 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-transform hover:scale-110 hover:bg-white/20"
          aria-label="Next media">
          <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div
        className="relative flex h-[90vh] w-full max-w-5xl flex-col items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}>
        <div className="relative h-full w-full">
          {currentItem.type === "image" ? (
            <Image
              src={currentItem.url}
              alt={currentItem.title || currentItem.alt || `Media ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          ) : (
            <video controls autoPlay className="h-full w-full object-contain" preload="metadata" key={currentIndex}>
              <source src={getVideoSrc(currentItem.url)} type={getVideoMimeType(getVideoSrc(currentItem.url))} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {showCaption && currentItem.title && (
          <div className="absolute right-0 bottom-8 left-0 mx-auto max-w-2xl rounded-xl bg-black/60 p-4 text-center text-white backdrop-blur-md">
            <h3 className="text-xl font-bold">{currentItem.title}</h3>
            {currentItem.description && <p className="mt-2 text-sm text-gray-200">{currentItem.description}</p>}
            <div className="mt-2 text-xs text-gray-400">
              ({currentIndex + 1} / {mediaItems.length})
            </div>
          </div>
        )}

        {!showCaption && (
          <div className="mt-4 rounded-full bg-white/10 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {currentIndex + 1} / {mediaItems.length}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
