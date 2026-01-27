"use client";

import { Collapsible } from "@components/ui/Collapsible";
import { Database, Layout, Shield, Smartphone, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { BlockRenderer } from "./BlockRenderer";
import { SpotlightIconType, SpotlightItem } from "./types";

// --- Icons Map ---
const ICON_MAP: Record<SpotlightIconType, React.ReactNode> = {
  shield: <Shield className="h-6 w-6" />,
  zap: <Zap className="h-6 w-6" />,
  database: <Database className="h-6 w-6" />,
  smartphone: <Smartphone className="h-6 w-6" />,
  layout: <Layout className="h-6 w-6" />,
};

interface TechnicalSpotlightProps {
  title: string;
  items: SpotlightItem[];
}

export function TechnicalSpotlight({ title, items }: TechnicalSpotlightProps) {
  const t = useTranslations("projects");

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <Collapsible key={item.id} title={item.title} badge={item.role} icon={ICON_MAP[item.icon]}>
            <div className="flex flex-col gap-8">
              {/* Summary moved to expanded state */}
              <p className="text-base text-gray-600 dark:text-gray-300">{item.summary}</p>

              {item.blocks.map((block, idx) => (
                <BlockRenderer key={idx} block={block} />
              ))}

              {item.codeSnippet && (
                <div>
                  <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{t("codeSnippet")}</h4>
                  <div className="rounded-lg bg-gray-900 p-4 dark:bg-black/50">
                    <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                      <span className="font-semibold">{item.codeSnippet.title}</span>
                      <span className="uppercase">{item.codeSnippet.language}</span>
                    </div>
                    <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-gray-300">
                      <code>{item.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </Collapsible>
        ))}
      </div>
    </section>
  );
}

