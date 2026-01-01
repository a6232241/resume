import { SocialLinks } from "@features/profile";
import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
}

export default function Hero({ title, description }: HeroProps) {
  return (
    <section className="flex min-h-[60vh] flex-col-reverse items-center justify-center gap-8 py-20 md:flex-row md:justify-between">
      <div className="flex flex-2 animate-[fadeIn_1s_ease-out_forwards] flex-col items-start gap-6 opacity-0">
        <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl dark:from-blue-400 dark:to-purple-400">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">{description}</p>
        <div className="flex gap-4">
          <SocialLinks />
        </div>
      </div>

      <div className="relative flex flex-1 animate-[fadeIn_1s_ease-out_0.5s_forwards] justify-center opacity-0">
        <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-gray-800">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 text-4xl dark:from-blue-900 dark:to-purple-900">
            <Image src="/avatar.jpg" alt="Avatar" fill className="object-contain" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-500/10"></div>
      </div>
    </section>
  );
}
