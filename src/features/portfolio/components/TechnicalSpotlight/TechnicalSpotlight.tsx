"use client";

import { Collapsible } from "@components/ui/Collapsible";
import { Database, Layout, Shield, Smartphone, Zap } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

// --- Types ---
export type SpotlightIconType = "shield" | "zap" | "database" | "smartphone" | "layout";

export interface ContentBlock {
  type: "workflow" | "grid" | "comparison" | "list" | "challenges" | "architecture";
  title: string;
  // Workflow Step
  steps?: Array<{ step: string; title: string; desc: string }>;
  // Grid Item
  items?:
    | Array<{
        icon?: string;
        title: string;
        desc?: string;
        symptom?: string;
        solution?: string;
        result?: string;
      }>
    | string[]; // Allow string array for 'list' type
  // Comparison
  headers?: string[];
  rows?: string[][];
  // Architecture Layers
  layers?: Array<{ name: string; desc: string; role: string }>;
}

export interface SpotlightItem {
  id: string;
  title: string;
  role: string;
  icon: SpotlightIconType;
  summary: string;
  blocks: ContentBlock[];
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
}

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
      <div className="flex items-center gap-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="flex flex-col gap-6">
        {items.map((item) => (
          <Collapsible
            key={item.id}
            title={item.title}
            subtitle={item.summary}
            badge={item.role}
            icon={ICON_MAP[item.icon]}
            defaultOpen={item.id === "idv"} // Open first item by default
          >
            <div className="flex flex-col gap-8">
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

// --- Block Renderers ---

function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "workflow":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
          <div className="relative flex flex-col gap-4 md:flex-row">
            {block.steps?.map((step, i) => (
              <div key={i} className="flex flex-1 flex-col gap-2 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs font-bold text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {step.step}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{step.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "grid":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.items?.map((item, i) => {
              if (typeof item === "string") return null;
              return (
                <div key={i} className="flex flex-col gap-2 rounded-lg border border-gray-100 p-4 dark:border-gray-800">
                  <div className="text-2xl">{item.icon}</div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{item.title}</h5>
                  <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "comparison":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  {block.headers?.map((h, i) => (
                    <th key={i} className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {block.rows?.map((row, i) => (
                  <tr key={i} className="bg-white dark:bg-transparent">
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );

    case "list":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
          <ul className="space-y-2">
            {block.items?.map((item, i) => {
              // Ensure we are handling string items for list type
              if (typeof item !== "string") return null;

              return (
                <li key={i} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace(
                        /\*\*(.*?)\*\*/g,
                        '<strong class="text-gray-900 dark:text-white">$1</strong>',
                      ),
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );

    case "challenges":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
          <div className="flex flex-col gap-4">
            {block.items?.map((item, i) => {
              if (typeof item === "string") return null;
              return (
                <div
                  key={i}
                  className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800/20">
                  <h5 className="mb-2 font-bold text-gray-900 dark:text-white">{item.title}</h5>
                  <div className="grid gap-2 text-sm sm:grid-cols-[auto_1fr]">
                    <span className="font-semibold text-red-500">Symptom</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.symptom}</span>
                    <span className="font-semibold text-blue-500">Solution</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.solution}</span>
                    <span className="font-semibold text-green-500">Result</span>
                    <span className="text-gray-600 dark:text-gray-400">{item.result}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );

    case "architecture": // Added for Reward Engine
      // Note: JSON "type": "architecture" is mapped here
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase">{block.title}</h4>
          <div className="flex flex-col gap-2">
            {block.layers?.map((layer, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded border border-gray-200 p-3 shadow-sm dark:border-gray-700">
                <div className="w-32 font-bold text-gray-900 dark:text-white">{layer.name}</div>
                <div className="h-4 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">{layer.desc}</div>
                <div className="text-xs font-semibold tracking-wide text-purple-600 uppercase dark:text-purple-400">
                  {layer.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

