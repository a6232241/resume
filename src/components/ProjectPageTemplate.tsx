"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MediaItem {
  type: "image" | "video";
  url: string;
  alt?: string;
}

interface ProjectPageTemplateProps {
  // Header data
  authorName: string;
  authorAvatar: string;

  // Project content
  title: string;
  description: string;

  // Carousel media
  mediaItems: MediaItem[];

  // Optional back link
  backLink?: string;
}

export default function ProjectPageTemplate({
  authorName,
  authorAvatar,
  title,
  description,
  mediaItems,
  backLink = "/",
}: ProjectPageTemplateProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Auto-change carousel every 1 second
  useEffect(() => {
    if (mediaItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [mediaItems.length]);

  const currentMedia = mediaItems[currentMediaIndex];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-500 shadow-lg">
              <Image src={authorAvatar} alt={authorName} fill className="object-cover" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{authorName}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Developer & Designer</p>
            </div>
          </div>

          {backLink && (
            <Link
              href={backLink}
              className="group flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Title */}
          <h1 className="mb-6 animate-[fadeIn_1s_ease-out_forwards] bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-6xl dark:from-blue-400 dark:to-purple-400">
            {title}
          </h1>

          {/* Carousel */}
          <div className="group relative mb-8 animate-[fadeIn_1s_ease-out_0.2s_forwards] overflow-hidden rounded-3xl bg-white opacity-0 shadow-2xl dark:bg-gray-800">
            <div className="relative aspect-video w-full">
              {currentMedia.type === "image" ? (
                <Image
                  src={currentMedia.url}
                  alt={currentMedia.alt || `Demo ${currentMediaIndex + 1}`}
                  fill
                  className="object-cover transition-opacity duration-500"
                  priority
                />
              ) : (
                <video src={currentMedia.url} className="h-full w-full object-cover" autoPlay muted loop playsInline />
              )}

              {/* Carousel Indicators */}
              {mediaItems.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {mediaItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentMediaIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Navigation Arrows */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setCurrentMediaIndex((currentMediaIndex - 1 + mediaItems.length) % mediaItems.length)
                    }
                    className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/75"
                    aria-label="Previous slide">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentMediaIndex((currentMediaIndex + 1) % mediaItems.length)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/75"
                    aria-label="Next slide">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Media counter */}
            {mediaItems.length > 1 && (
              <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {currentMediaIndex + 1} / {mediaItems.length}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="animate-[fadeIn_1s_ease-out_0.4s_forwards] space-y-4 rounded-2xl bg-white p-8 opacity-0 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">About This Project</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
