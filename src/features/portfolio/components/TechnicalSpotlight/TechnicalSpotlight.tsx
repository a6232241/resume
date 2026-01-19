"use client";
import { cn } from "@src/util/cn";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Code, Database, Layout, Shield, Smartphone, Zap } from "lucide-react";
import React, { useState } from "react";

// --- Types ---

export type ContentBlock =
  | { type: "workflow"; title: string; steps: { step: string; title: string; desc: string }[] }
  | { type: "grid"; title: string; items: { icon: string; title: string; desc: string }[] }
  | { type: "list"; title: string; items: string[] }
  | { type: "comparison"; title: string; headers: string[]; rows: string[][] }
  | { type: "architecture"; title: string; layers: { name: string; desc: string; role: string }[] }
  | {
      type: "challenges";
      title: string;
      items: { title: string; symptom: string; solution: string; result: string }[];
    };

export interface SpotlightItem {
  id: string;
  title: string;
  role: string;
  icon: "shield" | "zap" | "database" | "smartphone" | "layout"; // Map string to Lucide icon
  summary: string;
  blocks: ContentBlock[];
  codeSnippet?: {
    title: string;
    language: string;
    code: string;
  };
}

interface TechnicalSpotlightProps {
  title: string;
  items: SpotlightItem[];
}

// --- Component ---

const IconMap = {
  shield: Shield,
  zap: Zap,
  database: Database,
  smartphone: Smartphone,
  layout: Layout,
};

export const TechnicalSpotlight: React.FC<TechnicalSpotlightProps> = ({ title, items }) => {
  const [activeTab, setActiveTab] = useState(items[0].id);

  const activeItem = items.find((item) => item.id === activeTab) || items[0];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
      <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar Tabs */}
        <div className="flex overflow-x-auto border-b border-gray-200 lg:w-64 lg:flex-col lg:border-r lg:border-b-0 dark:border-gray-800">
          {items.map((item) => {
            const Icon = IconMap[item.icon] || Layout;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex min-w-[160px] flex-col items-center gap-2 px-4 py-4 text-sm font-medium transition-colors lg:w-full lg:flex-row lg:items-center lg:justify-start lg:px-6 lg:py-4",
                  isActive
                    ? "bg-purple-50 text-purple-700 dark:bg-purple-900/10 dark:text-purple-300"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100",
                )}>
                <Icon className={cn("h-5 w-5", isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-400")} />
                <span>{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-600 lg:top-0 lg:bottom-auto lg:h-full lg:w-0.5"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}>
              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 dark:border-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                  <span>👑 {activeItem.role}</span>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{activeItem.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{activeItem.summary}</p>
              </div>

              {/* Dynamic Blocks */}
              <div className="space-y-8">
                {activeItem.blocks.map((block, idx) => (
                  <ContentBlockRenderer key={idx} block={block} />
                ))}
              </div>

              {/* Code Snippet */}
              {activeItem.codeSnippet && (
                <div className="mt-8">
                  <CollapsibleCodeSnippet snippet={activeItem.codeSnippet} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- Sub-Components ---

const ContentBlockRenderer: React.FC<{ block: ContentBlock }> = ({ block }) => {
  switch (block.type) {
    case "workflow":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {block.title}
          </h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {block.steps.map((step, i) => (
              <div key={i} className="relative rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                  {step.step}
                </div>
                <div className="mb-1 font-semibold text-gray-900 dark:text-white">{step.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "grid":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {block.title}
          </h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {block.items.map((item, i) => (
              <div key={i} className="flex gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "list":
      return (
        <div className="rounded-xl bg-gray-50 p-5 dark:bg-gray-800/50">
          <h4 className="mb-3 text-sm font-bold text-gray-900 dark:text-white">{block.title}</h4>
          <ul className="space-y-2">
            {block.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              </li>
            ))}
          </ul>
        </div>
      );

    case "architecture":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {block.title}
          </h4>
          <div className="flex flex-col gap-2 md:flex-row">
            {block.layers.map((layer, i) => (
              <div
                key={i}
                className="flex-1 rounded-lg border border-purple-200 bg-purple-50/50 p-4 text-center dark:border-purple-800 dark:bg-purple-900/10">
                <div className="mb-1 text-xs font-semibold text-purple-600 uppercase dark:text-purple-400">
                  {layer.role}
                </div>
                <div className="font-bold text-gray-900 dark:text-white">{layer.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{layer.desc}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case "comparison":
      return (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 px-4 py-2 text-xs font-bold tracking-wider text-gray-500 uppercase dark:bg-gray-800 dark:text-gray-400">
            {block.title}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                  {block.headers.map((h, i) => (
                    <th key={i} className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {block.rows.map((row, r) => (
                  <tr key={r} className="bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50">
                    {row.map((cell, c) => (
                      <td key={c} className="px-4 py-2 text-gray-600 dark:text-gray-300">
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

    case "challenges":
      return (
        <div>
          <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {block.title}
          </h4>
          <div className="space-y-4">
            {block.items.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-2 font-bold text-gray-900 dark:text-white">{item.title}</div>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-red-600 dark:text-red-400">Symptom:</span>
                    <span className="text-gray-600 dark:text-gray-300">{item.symptom}</span>
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-purple-600 dark:text-purple-400">Solution:</span>
                    <span
                      className="text-gray-600 dark:text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: item.solution.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-[80px_1fr] gap-2">
                    <span className="font-bold text-green-600 dark:text-green-400">Result:</span>
                    <span className="text-gray-600 dark:text-gray-300">{item.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
};

const CollapsibleCodeSnippet: React.FC<{ snippet: { title: string; language: string; code: string } }> = ({
  snippet,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between bg-gray-50 px-4 py-3 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700/80">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <Code className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{snippet.title}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 uppercase">{snippet.language}</span>
          <ChevronDown className={cn("h-4 w-4 text-gray-400 transition-transform", isOpen && "rotate-180")} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden">
            <pre className="overflow-x-auto bg-gray-950 p-4 font-mono text-xs leading-relaxed text-gray-300">
              <code>{snippet.code}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

