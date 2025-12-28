import Avatar from "@public/avatar.jpg";

import Image from "next/image";

import Link from "next/link";

import { getTranslations } from "next-intl/server";

const authorName = "Kuan-Cheng Cai";

export default async function ProjectDemoLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  return (
    <div className="relative min-h-screen overflow-hidden">
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-blue-500 shadow-lg">
              <Image src={Avatar} alt={authorName} fill className="object-cover" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">{authorName}</h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">Developer</p>
            </div>
          </div>

          <Link
            href={`/${lang}`}
            className="group flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>

            {t("nav.back")}
          </Link>
        </div>
      </header>

      {children}
    </div>
  );
}
