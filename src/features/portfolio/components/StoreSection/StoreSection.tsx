"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface Props {
  appleAppStoreLink?: string;
  googlePlayStoreLink?: string;
  websiteLink?: string;
}

export function StoreSection({ appleAppStoreLink, googlePlayStoreLink, websiteLink }: Props) {
  const t = useTranslations("projects");

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t("storeLink")}</h2>

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
        {appleAppStoreLink && (
          <Link
            href={appleAppStoreLink}
            target="_blank"
            className="block text-gray-700 hover:underline dark:text-gray-300">
            {appleAppStoreLink}
          </Link>
        )}
        {googlePlayStoreLink && (
          <Link
            href={googlePlayStoreLink}
            target="_blank"
            className="block text-gray-700 hover:underline dark:text-gray-300">
            {googlePlayStoreLink}
          </Link>
        )}
        {websiteLink && (
          <Link href={websiteLink} target="_blank" className="block text-gray-700 hover:underline dark:text-gray-300">
            {websiteLink}
          </Link>
        )}
      </div>
    </section>
  );
}
