import { ProjectImageGrid } from "@components/shared/ProjectImageGrid";
import { LegalDisclaimer, ProjectHero, ProjectOverview, TechnicalChallengeCard } from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

export default async function VisualStreamingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "projects.visualStreaming.detail" });

  // --- Hero Data ---
  const heroData = {
    title: t("hero.title"),
    tagline: t("hero.tagline"),
    description: t("hero.description"),
    summary: {
      problem: {
        icon: "🎯",
        title: t("hero.summary.problem.title"),
        desc: t.rich("hero.summary.problem.desc", {
          highlight: (chunks) => <span className="font-bold text-cyan-600 dark:text-cyan-400">{chunks}</span>,
        }),
      },
      solution: {
        icon: "💡",
        title: t("hero.summary.solution.title"),
        desc: t("hero.summary.solution.desc"),
      },
      impact: {
        icon: "🚀",
        title: t("hero.summary.impact.title"),
        desc: t.rich("hero.summary.impact.desc", {
          highlight: (chunks) => <span className="font-bold text-cyan-600 dark:text-cyan-400">{chunks}</span>,
        }),
      },
    },
  };

  // --- Overview Data ---
  const overviewData = {
    overview: {
      duration: t("overview.duration"),
      team: t("overview.team"),
      projectType: t("overview.projectType"),
      focus: t.raw("overview.focus") as string[],
      mainTechs: t.raw("overview.mainTechs") as string[],
      platforms: t.raw("overview.platforms") as string[],
    },
  };

  // --- Challenges Data ---
  const challengesRaw = t.raw("challenges") as Array<{
    id: number;
    title: string;
    symptom: string;
    rootCause: string;
    impact: string;
    badge?: string;
    metrics?: {
      label: string;
      before: string;
      after: string;
    };
    filePath?: string;
    codeSnippet: string;
    highlightTerms: string[];
    multiHighlightTerms: string[][];
    solution: {
      approach: string;
      details: string[];
      result: string;
      category: string;
    };
  }>;

  // --- Architecture Data ---
  const architectureData = t.raw("architecture") as {
    title: string;
    layers: Array<{
      name: string;
      icon: string;
      responsibilities: string[];
    }>;
  };

  // --- Evidence Data ---
  const evidenceRaw = t.raw("evidence") as {
    videos: Record<string, { title: string; desc: string }>;
    screenshots: Record<string, { title: string; desc: string }>;
  };

  const demoMediaItems = [
    {
      type: "image" as const,
      src: getMediaUrl("/visual-streaming/demo_00.png"),
      alt: evidenceRaw.screenshots.s1.title,
      title: evidenceRaw.screenshots.s1.title,
      description: evidenceRaw.screenshots.s1.desc,
    },
    {
      type: "image" as const,
      src: getMediaUrl("/visual-streaming/demo_01.png"),
      alt: evidenceRaw.screenshots.s2.title,
      title: evidenceRaw.screenshots.s2.title,
      description: evidenceRaw.screenshots.s2.desc,
    },
    {
      type: "video" as const,
      src: getMediaUrl("/visual-streaming/demo_android_00.mp4"),
      alt: evidenceRaw.videos.v1.title,
      title: evidenceRaw.videos.v1.title,
      description: evidenceRaw.videos.v1.desc,
    },
    {
      type: "video" as const,
      src: getMediaUrl("/visual-streaming/demo_ios_00.mp4"),
      alt: evidenceRaw.videos.v2.title,
      title: evidenceRaw.videos.v2.title,
      description: evidenceRaw.videos.v2.desc,
    },
  ];

  // --- Disclaimer ---
  const disclaimerText = t("disclaimer");

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      {/* Hero Section */}
      <ProjectHero
        {...heroData}
        gradientClass="from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400"
        borderGradientClass="from-cyan-600/20 via-blue-600/20 to-purple-600/20"
      />

      {/* Overview Section */}
      <ProjectOverview {...overviewData} techBadgeColor="blue" focusBadgeColor="purple" />

      {/* Technical Challenges */}
      <TechnicalChallengeCard challenges={challengesRaw} />

      {/* Architecture Visualization */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{architectureData.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {architectureData.layers.map((layer, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200/50 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 dark:border-gray-700/50 dark:bg-gray-800/50">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-2xl">{layer.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white">{layer.name}</h3>
              </div>
              <ul className="space-y-2">
                {layer.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500" />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Gallery */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          {lang === "zh" ? "專案展示" : "Project Demo"}
        </h2>
        <ProjectImageGrid items={demoMediaItems} accentColor="blue" itemAspectRatio="aspect-video" />
      </section>

      {/* Disclaimer */}
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
