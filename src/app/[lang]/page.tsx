import { Experience, ProjectCard } from "@features/portfolio";
import { Hero, Skills } from "@features/profile";
import { getMediaUrl } from "@src/util";
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
    badge: "projects.visualStreaming.badge",
    achievements: "projects.visualStreaming.achievements",
    role: "projects.visualStreaming.role",
    imageUrl: getMediaUrl("/visual-streaming/demo_preview.png"),
    link: "visual-streaming",
    period: "2025/04 - 2025/07",
  },
  {
    title: "Berify",
    description: "projects.berify.shortDesc",
    technologies: "projects.berify.technologies",
    achievements: "projects.berify.achievements",
    role: "projects.berify.role",
    imageUrl: getMediaUrl("/berify/preview.png"),
    link: "berify",
    period: "2023/05 - 2025/09",
  },
];

const workExperiences = [
  {
    title: "projects.10xAppSpeed.title",
    description: "projects.10xAppSpeed.shortDesc",
    technologies: "projects.10xAppSpeed.technologies",
    badge: "projects.10xAppSpeed.badge",
    link: "10x-app-speed",
    period: "2025/02",
    role: "projects.10xAppSpeed.role",
  },
];

const personalProjects = [
  {
    title: "Music Player",
    description: "projects.musicPlayer.shortDesc",
    technologies: "projects.musicPlayer.technologies",
    badge: "projects.musicPlayer.badge",
    imageUrl: getMediaUrl("/music-player/launch_screen-light_theme.png"),
    link: "music-player",
    period: "2025/09 - Present",
    role: "projects.musicPlayer.role",
  },
  {
    title: "AI Chat App",
    description: "projects.aiChatApp.shortDesc",
    technologies: "projects.aiChatApp.technologies",
    badge: "projects.aiChatApp.badge",
    imageUrl: getMediaUrl("/ai-chat-app/preview-light_theme.png"),
    link: "ai-chat-app",
    period: "2025/07 - 2025/10 (First version)",
    role: "projects.aiChatApp.role",
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
                badge={project.badge ? t(project.badge) : undefined}
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
                title={t(project.title)}
                description={t(project.description)}
                link={`/${lang}/project-demo/${project.link}`}
                period={project.period}
                technologies={t.raw(project?.technologies) ?? []}
                badge={project.badge ? t(project.badge) : undefined}
                role={t(project.role)}
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
                title={project.title}
                description={t(project.description)}
                imageUrl={project.imageUrl}
                link={`/${lang}/project-demo/${project.link}`}
                period={project.period}
                technologies={t.raw(project?.technologies) ?? []}
                badge={project.badge ? t(project.badge) : undefined}
                role={project?.role ? t(project.role) : undefined}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
