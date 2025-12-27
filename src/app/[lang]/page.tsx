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
  { company: "樂創互娛", role: "Frontend Developer", period: "2024 - Present" },
  { company: "Byte x Byte", role: "Software Developer", period: "2023 - 2024" },
  { company: "智慧價值", role: "Programmer", period: "2021 - 2023" },
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

const workProjects = [
  {
    title: "Visual Streaming",
    description: "projects.visualStreaming.shortDesc",
    technologies: "projects.visualStreaming.technologies",
    achievements: "projects.visualStreaming.achievements",
    role: "projects.visualStreaming.role",
    imageUrl: VisualStreamingPreview,
    link: "visual-streaming",
    period: "2025/04 - 2025/07",
  },
  {
    title: "Berify",
    description: "projects.berify.shortDesc",
    technologies: "projects.berify.technologies",
    achievements: "projects.berify.achievements",
    role: "projects.berify.role",
    imageUrl: BerifyPreview,
    link: "berify",
    period: "2023/05 - 2025/09",
  },
];

const workExperiences: React.ComponentProps<typeof ProjectCard>[] = [
  {
    title: "Optimization loading speed",
    description: "projects.optimizationLoadingSpeed.shortDesc",
    link: "optimization-loading-speed",
  },
];

const personalProjects: React.ComponentProps<typeof ProjectCard>[] = [
  {
    title: "Music Player",
    description: "projects.musicPlayer.shortDesc",
    imageUrl: MusicPlayerPreview,
    link: "music-player",
    period: "2025/09 - Present",
  },
  {
    title: "AI Chat App",
    description: "projects.aiChatApp.shortDesc",
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
        <Hero title={t("profile.greeting")} description={t("profile.bio")} />

        <Experience title={t("section.experience")} items={experienceItems} />

        <Skills title={t("section.skills")} items={skills} />

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("section.workProjects")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {workProjects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={t(project.description)}
                imageUrl={project.imageUrl}
                link={`/${lang}/project-demo/${project.link}`}
                period={project.period}
                technologies={t.raw(project?.technologies) ?? []}
                achievements={t.raw(project?.achievements) ?? []}
                role={t(project.role)}
              />
            ))}
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("section.workExperience")}</h2>
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
          <h2 className="mb-12 text-center text-3xl font-bold">{t("section.personalProjects")}</h2>
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
