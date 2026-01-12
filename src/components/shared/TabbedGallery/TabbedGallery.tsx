"use client";

import { ProjectImageGrid, type ProjectImageGridItem } from "@components/shared/ProjectImageGrid";
import { useState } from "react";

export interface TabbedGalleryTab {
  label: string;
  items: ProjectImageGridItem[];
}

export interface TabbedGalleryProps {
  tabs: TabbedGalleryTab[];
  accentColor?: "purple" | "blue" | "orange";
  itemAspectRatio?: string;
}

export function TabbedGallery({ tabs, accentColor = "purple", itemAspectRatio = "aspect-[9/16]" }: TabbedGalleryProps) {
  const [activeTab, setActiveTab] = useState(0);

  const accentClasses = {
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

  return (
    <div>
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveTab(index)}
              className={`border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === index ? accentClasses[accentColor].active : accentClasses[accentColor].inactive
              }`}>
              {tab.label}
              <span
                className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  activeTab === index
                    ? `bg-${accentColor}-100 text-${accentColor}-800 dark:bg-${accentColor}-900/50 dark:text-${accentColor}-200`
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}>
                {tab.items.length}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <ProjectImageGrid items={tabs[activeTab].items} accentColor={accentColor} itemAspectRatio={itemAspectRatio} />
    </div>
  );
}

