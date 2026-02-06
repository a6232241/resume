"use client";
import { ProjectImageItem, ProjectImageItemProps } from "@src/components/shared";
import { LightBox, LightBoxMediaItem } from "@src/components/ui";
import { cn } from "@src/util";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ShowcaseBlockProps {
  showcase: ProjectImageItemProps;
  className?: string;
}

export function ShowcaseBlock({ showcase, className }: ShowcaseBlockProps) {
  const t = useTranslations("projects");
  const [isOpen, setIsOpen] = useState(false);

  const lightBoxMediaItems: LightBoxMediaItem[] = showcase
    ? [
        {
          type: showcase.type,
          url: showcase.src,
        },
      ]
    : [];

  return (
    <>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm dark:border-emerald-900/30 dark:bg-slate-900",
          className,
        )}>
        <div className="flex h-full flex-col items-center">
          <div className="mb-8 w-full">
            <h4 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t("showcase")}</h4>
          </div>
          <ProjectImageItem {...showcase} onClick={() => setIsOpen(true)} />
        </div>
      </div>
      <LightBox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        mediaItems={lightBoxMediaItems}
        currentIndex={0}
        loop
        showCaption
      />
    </>
  );
}
