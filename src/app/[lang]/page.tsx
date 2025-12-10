import AIChatAppPreview from "@public/side-projects/ai-chat-app/preview-light_theme.png";
import MusicPlayerPreview from "@public/side-projects/music-player/launch_screen-light_theme.png";
import VisualStreamingPreview from "@public/work-projects/visual-streaming/demo_preview.png";
import Experience from "@src/components/Experience";
import Hero from "@src/components/Hero";
import ProjectCard from "@src/components/ProjectCard";
import Skills from "@src/components/Skills";
import { getDictionary } from "@src/util/dictionaries";

export default async function Home({ params }: { params: Promise<{ lang: "en" | "zh" }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict) => dict[key] || key;

  const experienceItems = [
    { company: "樂創互娛", role: "Frontend Developer", period: "2021 - Present" },
    { company: "Byte x Byte", role: "Software Developer", period: "2020 - 2021" },
    { company: "智慧價值", role: "Programmer", period: "2019 - 2020" },
  ];

  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "React Native",
    "Mobile Development",
    "Web Development",
  ];

  return (
    <div className="relative min-h-screen overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <main className="container mx-auto flex flex-col items-center gap-24 px-6 pt-10 pb-24">
        <Hero
          title={t("Hello, I'm Kuan-Cheng Tsai")}
          description={t(
            "I am a frontend developer specializing in mobile applications with React Native, with over four years of experience, and I also have experience using Next.js for web application development.",
          )}
        />

        <Experience title={t("Experience")} items={experienceItems} />

        <Skills title={t("Skills")} items={skills} />

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("Work Projects")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Visual Streaming"
              description={t("This is a 2D face swap app that allows users to swap their face with another face.")}
              imageUrl={VisualStreamingPreview}
              link={`/${lang}/project-demo/visual-streaming`}
            />
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("Work Experience")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title={t("Optimization loading speed")}
              description={t("Use React devtools and fliper find the performance issue and optimize it.")}
              link={`/${lang}/project-demo/optimization-loading-speed`}
            />
          </div>
        </section>

        <section className="w-full">
          <h2 className="mb-12 text-center text-3xl font-bold">{t("Personal Projects")}</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ProjectCard
              title="Music Player"
              description={t("This is a music player app that allows users to listen to music.")}
              imageUrl={MusicPlayerPreview}
              link={`/${lang}/project-demo/music-player`}
            />
            <ProjectCard
              title="AI Chat App"
              description={t("This is a chat application with artificial intelligence.")}
              imageUrl={AIChatAppPreview}
              link={`/${lang}/project-demo/ai-chat-app`}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
