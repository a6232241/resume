"use client";
import { useTranslations } from "next-intl";

interface Props {
  description: string;
}

export default function ProjectDescription({ description }: Props) {
  const t = useTranslations();

  return (
    <div className="space-y-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{t("section.about")}</h2>
      <p className="leading-relaxed whitespace-pre-wrap text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
