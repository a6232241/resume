"use client";

interface PerformanceHeroProps {
  title: string;
  tagline: string;
  description?: string;
}

export default function PerformanceHero({ title, tagline, description }: PerformanceHeroProps) {
  return (
    <section className="mb-12">
      <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl dark:from-blue-400 dark:to-purple-400">
        {title}
      </h1>
      <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">{tagline}</p>
      {description && <p className="mt-6 text-lg leading-relaxed text-gray-700 dark:text-gray-200">{description}</p>}
    </section>
  );
}
