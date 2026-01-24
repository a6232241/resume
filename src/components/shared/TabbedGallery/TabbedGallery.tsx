"use client";

import { ProjectImageGrid, type ProjectImageGridItem } from "@components/shared/ProjectImageGrid";
import { useState } from "react";

export interface TabbedGalleryTab {
  label: string;
  items: ProjectImageGridItem[];
  aspectRatio?: string;
  accentColor?: "purple" | "blue" | "orange";
}

export interface TabbedGalleryProps {
  tabs: TabbedGalleryTab[];
  accentColor?: "purple" | "blue" | "orange";
  itemAspectRatio?: string;
  title: string;
}

export function TabbedGallery({
  tabs,
  accentColor = "purple",
  itemAspectRatio = "aspect-video",
  title,
}: TabbedGalleryProps) {
  const [activeTab, setActiveTab] = useState(0);

  const accentClasses: Record<"purple" | "blue" | "orange", { active: string; inactive: string }> = {
    purple: {
      active: "border-purple-500 text-purple-600 dark:text-purple-400",
      inactive:
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300",
    },
    blue: {
      active: "border-blue-500 text-blue-600 dark:text-blue-400",
      inactive:
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300",
    },
    orange: {
      active: "border-orange-500 text-orange-600 dark:text-orange-400",
      inactive:
        "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300",
    },
  };

  const activeTabObj = tabs[activeTab];
  const currentAccent = activeTabObj.accentColor || accentColor;
  const currentAspectRatio = activeTabObj.aspectRatio || itemAspectRatio;

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>

      <div>
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab, index) => {
              const tabAccent = tab.accentColor || accentColor;
              const isActive = activeTab === index;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive ? accentClasses[tabAccent].active : accentClasses[tabAccent].inactive
                  }`}>
                  {tab.label}
                  <span
                    className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isActive
                        ? `bg-${tabAccent}-100 text-${tabAccent}-800 dark:bg-${tabAccent}-900/50 dark:text-${tabAccent}-200`
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}>
                    {tab.items.length}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <ProjectImageGrid items={activeTabObj.items} accentColor={currentAccent} itemAspectRatio={currentAspectRatio} />
      </div>
    </section>
  );
}

