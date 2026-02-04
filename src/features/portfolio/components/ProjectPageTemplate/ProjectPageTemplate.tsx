"use client";

import { LightBox } from "@components/ui";
import { MediaItem } from "@src/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { ProjectDescription } from "../ProjectDescription";
import ProjectArchitecture from "./ProjectArchitecture";
import ProjectChallenges from "./ProjectChallenges";
import ProjectLearnings from "./ProjectLearnings";
import ProjectMedia from "./ProjectMedia";
import ProjectMetrics from "./ProjectMetrics";
import ProjectMotivation from "./ProjectMotivation";
import ProjectOverview from "./ProjectOverview";
import ProjectSolutions from "./ProjectSolutions";
import { ProjectDetailData } from "./types";

interface ProjectPageTemplateProps {
  // Project content
  title: string;
  description: string;

  // Carousel media
  mediaItems: MediaItem[];

  // Project detail data
  projectDetail: ProjectDetailData;

  // Optional source code link
  sourceCodeLink?: string;

  // Optional store link
  storeLink?: {
    appleAppStoreLink?: string;
    googlePlayStoreLink?: string;
    websiteLink?: string;
  };
}

export default function ProjectPageTemplate({
  title,
  description,
  mediaItems,
  projectDetail,
  sourceCodeLink,
  storeLink,
}: ProjectPageTemplateProps) {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleMediaClick = (index: number) => {
    setCurrentMediaIndex(index);
    setIsLightBoxOpen(true);
  };

  const t = useTranslations();

  return (
    <>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          {/* 標題 */}
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl dark:from-blue-400 dark:to-purple-400">
            {projectDetail.hero?.title || title}
          </h1>

          {/* Tagline */}
          {projectDetail.hero?.tagline && (
            <p className="text-xl text-gray-600 dark:text-gray-300">{projectDetail.hero.tagline}</p>
          )}

          {/* 項目概況卡片 */}
          {projectDetail.overview && <ProjectOverview data={projectDetail.overview} />}

          {/* 媒體展示 */}
          <ProjectMedia mediaItems={mediaItems} onMediaClick={handleMediaClick} />

          {/* 項目背景 */}
          {projectDetail.motivation && <ProjectMotivation data={projectDetail.motivation} />}

          {/* 三大挑戰 */}
          {projectDetail.challenges && <ProjectChallenges data={projectDetail.challenges} />}

          {/* 解決方案 */}
          {projectDetail.solutions && <ProjectSolutions data={projectDetail.solutions} />}

          {/* 架構圖 */}
          {projectDetail.architecture && <ProjectArchitecture data={projectDetail.architecture} />}

          {/* 性能指標 */}
          {projectDetail.metrics && <ProjectMetrics data={projectDetail.metrics} />}

          {/* 個人收穫 */}
          {projectDetail.learnings && <ProjectLearnings data={projectDetail.learnings} />}

          {/* 簡單描述 */}
          <ProjectDescription description={description} />

          {/* Source code link */}
          {sourceCodeLink && (
            <div className="space-y-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{t("projects.sourceCode")}</h2>
              <Link href={sourceCodeLink} target="_blank" className="text-gray-700 hover:underline dark:text-gray-300">
                {sourceCodeLink}
              </Link>
            </div>
          )}

          {/* Store links */}
          {storeLink && (
            <div className="space-y-4 rounded-2xl bg-white p-8 shadow-lg dark:bg-white/5">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{t("projects.storeLink")}</h2>
              <div className="space-y-2">
                {storeLink?.appleAppStoreLink && (
                  <Link
                    href={storeLink.appleAppStoreLink}
                    target="_blank"
                    className="block text-gray-700 hover:underline dark:text-gray-300">
                    {storeLink.appleAppStoreLink}
                  </Link>
                )}
                {storeLink?.googlePlayStoreLink && (
                  <Link
                    href={storeLink.googlePlayStoreLink}
                    target="_blank"
                    className="block text-gray-700 hover:underline dark:text-gray-300">
                    {storeLink.googlePlayStoreLink}
                  </Link>
                )}
                {storeLink?.websiteLink && (
                  <Link
                    href={storeLink.websiteLink}
                    target="_blank"
                    className="block text-gray-700 hover:underline dark:text-gray-300">
                    {storeLink.websiteLink}
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* LightBox Component */}
      <LightBox
        isOpen={isLightBoxOpen}
        onClose={() => setIsLightBoxOpen(false)}
        mediaItems={mediaItems}
        currentIndex={currentMediaIndex}
        onNavigate={setCurrentMediaIndex}
      />
    </>
  );
}
