"use client";

import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface MediaItem {
  type: "image" | "video";
  url: StaticImageData | string;
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
  const getVideoSrc = (url: string | StaticImageData): string => {
    return typeof url === "string" ? url : url.src;
  };

  const t = useTranslations();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
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
              {t("Back")}
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

          <div className="group relative mb-8 flex animate-[fadeIn_1s_ease-out_0.2s_forwards] flex-row flex-nowrap gap-5 overflow-scroll bg-transparent opacity-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {mediaItems.map((item, index) => (
              <div
                className="relative flex-shrink-0 flex-grow-0 basis-[200px] overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-800"
                style={{ minHeight: "350px" }}
                key={index}>
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.alt || `Demo ${index + 1}`}
                    fill
                    className="object-contain transition-opacity duration-500"
                    priority
                  />
                ) : (
                  <video className="h-full w-full object-contain" autoPlay muted loop playsInline>
                    <source src={getVideoSrc(item.url)} type="video/mp4" />
                    {item.alt && <p>{item.alt}</p>}
                  </video>
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="animate-[fadeIn_1s_ease-out_0.4s_forwards] space-y-4 rounded-2xl bg-white p-8 opacity-0 shadow-lg dark:bg-gray-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{t("About")}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">{description}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
