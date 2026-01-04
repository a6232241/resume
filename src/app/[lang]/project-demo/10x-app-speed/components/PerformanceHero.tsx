"use client";

interface PerformanceHeroProps {
  title: string;
  tagline: string;
  description?: React.ReactNode;
}

export default function PerformanceHero({ title, tagline, description }: PerformanceHeroProps) {
  return (
    <section className="mb-12">
      <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl dark:from-blue-400 dark:to-purple-400">
        {title}
      </h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{tagline}</p>
      {description && (
        <div className="mt-8 rounded-xl bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:bg-gray-800/50">
          <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-200">{description}</div>
        </div>
      )}
    </section>
  );
}
