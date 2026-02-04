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
        className={cn("relative overflow-hidden rounded-xl border border-emerald-900/30 bg-slate-900 p-6", className)}>
        <div className="relative">
          <div className="mb-4">
            <h4 className="text-xl font-bold tracking-tight text-white">{t("showcase")}</h4>
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
