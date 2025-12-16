"use client";

import Image, { StaticImageData } from "next/image";
import { useCallback, useEffect } from "react";

interface MediaItem {
  type: "image" | "video";
  url: StaticImageData | string;
  alt?: string;
}

interface LightBoxProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function LightBox({ isOpen, onClose, mediaItems, currentIndex, onNavigate }: LightBoxProps) {
  const currentItem = mediaItems[currentIndex];

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < mediaItems.length - 1) {
      onNavigate(currentIndex + 1);
    }
  }, [currentIndex, mediaItems.length, onNavigate]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={onClose}>
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-all hover:rotate-90 hover:bg-white/20"
        aria-label="Close lightbox">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/20"
          aria-label="Previous media">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {currentIndex < mediaItems.length - 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/20"
          aria-label="Next media">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Media content */}
      <div
        className="relative max-h-[90vh] max-w-[90vw] animate-[fadeIn_0.3s_ease-out_forwards]"
        onClick={(e) => e.stopPropagation()}>
        {currentItem.type === "image" ? (
          <div className="relative h-full w-full">
            <Image
              src={currentItem.url}
              alt={currentItem.alt || `Media ${currentIndex + 1}`}
              className="max-h-[90vh] w-auto object-contain"
              width={1200}
              height={800}
              priority
            />
          </div>
        ) : (
          <video className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl" controls autoPlay loop key={currentIndex}>
            <source src={getVideoSrc(currentItem.url)} type="video/mp4" />
            {currentItem.alt && <p>{currentItem.alt}</p>}
          </video>
        )}

        {/* Media counter */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-sm">
          {currentIndex + 1} / {mediaItems.length}
        </div>
      </div>
    </div>
  );
}
