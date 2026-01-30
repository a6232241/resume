"use client";

import { Collapsible } from "@components/ui/Collapsible";
import { Database, Layout, Shield, Smartphone, Zap } from "lucide-react";
import React, { useState } from "react";
import { AppClipFeature } from "./AppClipFeature";
import { BlockRenderer } from "./BlockRenderer";
import { CodeBlock } from "./CodeBlock";
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
  const [isOpenId, setIsOpenId] = useState<string | null>(items[0].id);

  const handleToggle = (id: string) => {
    setIsOpenId(isOpenId === id ? null : id);
  };

  return (
    <section className="flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <Collapsible
            key={item.id}
            title={item.title}
            badge={item.role}
            icon={ICON_MAP[item.icon]}
            isOpen={isOpenId !== null ? isOpenId === item.id : false}
            onToggle={() => handleToggle(item.id)}>
            {item.id === "app-clip" ? (
              <AppClipFeature item={item} />
            ) : (
              <div className="flex flex-col gap-8">
                {/* Summary moved to expanded state */}
                <p className="text-base text-gray-600 dark:text-gray-300">{item.summary}</p>

                {item.blocks.map((block, idx) => (
                  <BlockRenderer key={idx} block={block} />
                ))}

                {item.codeSnippet && <CodeBlock snippet={item.codeSnippet} />}
              </div>
            )}
          </Collapsible>
        ))}
      </div>
    </section>
  );
}

