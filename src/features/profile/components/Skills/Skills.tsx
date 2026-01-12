interface SkillsProps {
  title: string;
  items: string[];
}

export default function Skills({ title, items }: SkillsProps) {
  return (
    <section className="w-full py-16">
      <h2 className="mb-12 text-center text-3xl font-bold">{title}</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((skill, index) => (
          <div
            key={index}
            className="rounded-full bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700 backdrop-blur-sm transition-all hover:scale-110 hover:bg-blue-100 hover:text-blue-600 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-400">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
