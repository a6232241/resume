"use client";

interface RoadmapCategory {
  icon: string;
  title: string;
  items: string[];
}

export interface FutureRoadmapProps {
  title: string;
  subtitle?: string;
  categories: RoadmapCategory[];
}

export function FutureRoadmap({ title, subtitle, categories }: FutureRoadmapProps) {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">🚀 {title}</h2>
      {subtitle && <p className="mb-8 text-gray-600 dark:text-gray-400">{subtitle}</p>}

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 dark:border-white/10 dark:from-white/5 dark:to-white/[0.02] dark:backdrop-blur-sm">
            <div className="mb-4 text-4xl">{category.icon}</div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
            <ul className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl" />
          </div>
        ))}
      </div>
    </section>
  );
}
