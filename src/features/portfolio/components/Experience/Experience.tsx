interface ExperienceItem {
  company: string;
  role?: string;
  period?: string;
}

interface ExperienceProps {
  title: string;
  items: ExperienceItem[];
}

export default function Experience({ title, items }: ExperienceProps) {
  return (
    <section className="w-full py-16 backdrop-blur-sm">
      <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-white/5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="relative z-10 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.company}</h3>
              {item.role && <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{item.role}</p>}
              {item.period && <p className="text-xs text-gray-500 dark:text-gray-400">{item.period}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
