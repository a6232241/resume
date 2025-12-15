import AIChatAppPreview from "@public/side-projects/ai-chat-app/preview-light_theme.png";
import MusicPlayerPreview from "@public/side-projects/music-player/launch_screen-light_theme.png";
import BerifyPreview from "@public/work-projects/berify/preview.png";
import VisualStreamingPreview from "@public/work-projects/visual-streaming/demo_preview.png";
import Experience from "@src/components/Experience";
import Hero from "@src/components/Hero";
import ProjectCard from "@src/components/ProjectCard";
import Skills from "@src/components/Skills";
import { getTranslations } from "next-intl/server";

const experienceItems = [
  { company: "樂創互娛", role: "Frontend Developer", period: "2021 - Present" },
  { company: "Byte x Byte", role: "Software Developer", period: "2020 - 2021" },
  { company: "智慧價值", role: "Programmer", period: "2019 - 2020" },
];

const skills = [
  "React Native",
  "Expo",
  "React",
  "Next.js",
  "Redux",
  "TypeScript",
  "Tailwind CSS",
  "Objective-C",
  "Kotlin",
  "Swift",
  "C++",
];

const workProjects: React.ComponentProps<typeof ProjectCard>[] = [
  {
    title: "Visual Streaming",
    description: "This is a 2D face swap app that allows users to swap their face with another face",
    imageUrl: VisualStreamingPreview,
    link: "visual-streaming",
    period: "2025/04 - 2025/07",
  },
  {
    title: "Berify",
    description:
      "This is a Web3 smart retail system where merchants can manage and analyze products through the backend, while consumers can scan product tags to unlock product information, special promotions, NFTs, and gifts, It also provides third-party wallet integration, allowing users to view cryptocurrencies and NFTs through the wallet",
    imageUrl: BerifyPreview,
    link: "berify",
  },
];

const workExperiences: React.ComponentProps<typeof ProjectCard>[] = [
  {
    title: "Optimization loading speed",
    description: "The page load time has been reduced from more than ten seconds to less than one second",
    link: "optimization-loading-speed",
  },
];

const personalProjects: React.ComponentProps<typeof ProjectCard>[] = [
  {
    title: "Music Player",
    description: "This is a music player app that allows users to listen to music",
    imageUrl: MusicPlayerPreview,
    link: "music-player",
    period: "2025/09 - Present",
  },
  {
    title: "AI Chat App",
    description: "This is a chat application with artificial intelligence",
    imageUrl: AIChatAppPreview,
    link: "ai-chat-app",
    period: "2025/07 - 2025/10",
  },
];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang });

  return (
    <div className="relative min-h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto flex flex-col items-center gap-24 px-6 pt-10 pb-24">
        <Hero
          title={t("Hello, I'm Kuan-Cheng Tsai")}
          description={t(
            "I am a frontend developer specializing in mobile applications with React Native, with over four years of experience, and I also have experience using NextJs for web application development",
          )}
        />

        <Experience title={t("Experience")} items={experienceItems} />

        <Skills title={t("Skills")} items={skills} />

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("Work Projects")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workProjects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                description={t(project.description)}
                link={`/${lang}/project-demo/${project.link}`}
              />
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("Work Experience")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workExperiences.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                description={t(project.description)}
                link={`/${lang}/project-demo/${project.link}`}
              />
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("Personal Projects")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {personalProjects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                description={t(project.description)}
                link={`/${lang}/project-demo/${project.link}`}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
