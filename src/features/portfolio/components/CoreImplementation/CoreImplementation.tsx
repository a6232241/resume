"use client";

interface CoreCategory {
  icon: string;
  title: string;
  status?: "verified";
  items: string[];
}

export interface CoreImplementationProps {
  title: string;
  subtitle?: string;
  categories: CoreCategory[];
}

export function CoreImplementation({ title, subtitle, categories }: CoreImplementationProps) {
  return (
    <section>
      <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">✅ {title}</h2>
      {subtitle && <p className="mb-8 text-gray-600 dark:text-gray-400">{subtitle}</p>}

      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-50 to-emerald-50 p-6 shadow-lg shadow-green-500/10 transition-all hover:border-green-500/50 dark:border-green-500/20 dark:from-green-500/10 dark:to-emerald-500/5 dark:backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-4xl">{category.icon}</span>
              {category.status === "verified" && (
                <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                  Verified
                </span>
              )}
            </div>
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">{category.title}</h3>
            <ul className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <span className="mt-0.5 text-green-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 blur-2xl" />
          </div>
        ))}
      </div>
    </section>
  );
}

