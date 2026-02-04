import { TabbedGallery } from "@components/shared/TabbedGallery/TabbedGallery";
import { LegalDisclaimer, ProjectHero, ProjectOverview, TechnicalChallengeCard } from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

export default async function VisualStreamingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [t, commonT] = await Promise.all([
    getTranslations({ locale: lang, namespace: "projects.visualStreaming.detail" }),
    getTranslations({ locale: lang, namespace: "projects" }),
  ]);

  // --- Hero Data ---
  const heroData = {
    title: t("hero.title"),
    tagline: t("hero.tagline"),
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
    description: t("overview.description"),
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
    codeSnippetTableLabels?: string[];
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

  // --- Gallery Data ---
  const galleryRaw = t.raw("gallery") as {
    tabs: { demo: string; screenshots: string };
    demo: Record<string, { title: string; desc: string }>;
    screenshots: Record<string, { title: string; desc: string }>;
  };

  const demoItems = [
    { key: "v1", file: "demo_android_00.mp4" },
    { key: "v2", file: "demo_ios_00.mp4" },
  ].map((item) => ({
    type: "video" as const,
    src: getMediaUrl(`/visual-streaming/${item.file}`),
    alt: galleryRaw.demo[item.key]?.title || item.key,
    title: galleryRaw.demo[item.key]?.title,
    description: galleryRaw.demo[item.key]?.desc,
  }));

  const screenshotItems = [
    { key: "s1", file: "demo_00.png" },
    { key: "s2", file: "demo_01.png" },
  ].map((item) => ({
    type: "image" as const,
    src: getMediaUrl(`/visual-streaming/${item.file}`),
    alt: galleryRaw.screenshots[item.key]?.title || item.key,
    title: galleryRaw.screenshots[item.key]?.title,
    description: galleryRaw.screenshots[item.key]?.desc,
  }));

  const galleryTabs = [
    { label: galleryRaw.tabs.demo, items: demoItems },
    { label: galleryRaw.tabs.screenshots, items: screenshotItems },
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
      <ProjectOverview {...overviewData} techBadgeColor="blue" />

      {/* Technical Challenges */}
      <TechnicalChallengeCard challenges={challengesRaw} />

      {/* Architecture Visualization */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 backdrop-blur-sm dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
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
      <TabbedGallery title={commonT("projectShowcase")} tabs={galleryTabs} accentColor="blue" />

      {/* Disclaimer */}
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
