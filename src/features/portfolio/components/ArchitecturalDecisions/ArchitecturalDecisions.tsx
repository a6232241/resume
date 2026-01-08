"use client";

interface DecisionItem {
  icon: string;
  title: string;
  reason: string;
  details: string[];
}

export interface ArchitecturalDecisionsProps {
  title: string;
  subtitle?: string;
  items: DecisionItem[];
}

export function ArchitecturalDecisions({ title, subtitle, items }: ArchitecturalDecisionsProps) {
  return (
    <section>
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-sm">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">🧠 {title}</h2>
        {subtitle && <p className="mb-6 text-gray-600 dark:text-gray-400">{subtitle}</p>}

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 transition-all hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 dark:border-white/10 dark:from-white/5 dark:to-white/[0.02]">
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <p className="mb-4 text-sm font-medium text-purple-600 dark:text-purple-400">{item.reason}</p>

              <ul className="space-y-2">
                {item.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span className="mt-1 text-purple-600 dark:text-purple-400">→</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-50 blur-2xl transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

