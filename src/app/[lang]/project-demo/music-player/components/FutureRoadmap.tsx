"use client";

interface RoadmapCategory {
  icon: string;
  title: string;
  items: string[];
}

interface FutureRoadmapProps {
  title: string;
  categories: RoadmapCategory[];
}

export default function FutureRoadmap({ title, categories }: FutureRoadmapProps) {
  return (
    <section className="mb-12">
      <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">🚀 {title}</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-sm transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10">
            {/* Icon */}
            <div className="mb-4 text-4xl">{category.icon}</div>

            {/* Title */}
            <h3 className="mb-4 text-lg font-bold text-white">{category.title}</h3>

            {/* Items */}
            <ul className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-purple-400">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl" />
          </div>
        ))}
      </div>
    </section>
  );
}

