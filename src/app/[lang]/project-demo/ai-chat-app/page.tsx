import { TabbedGallery } from "@components/shared/TabbedGallery/TabbedGallery";
import {
  ArchitecturalDecisions,
  CoreImplementation,
  FutureRoadmap,
  LegalDisclaimer,
  ProjectHero,
  ProjectOverview,
  SourceCodeLink,
  TechnicalChallengeCard,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

export default async function AIChatAppPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [t, commonT] = await Promise.all([
    getTranslations({ locale: lang, namespace: "projects.aiChatApp.detail" }),
    getTranslations({ locale: lang, namespace: "projects" }),
  ]);

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
          highlight: (chunks) => <span className="font-bold text-purple-600 dark:text-purple-400">{chunks}</span>,
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
          highlight: (chunks) => <span className="font-bold text-green-600 dark:text-green-400">{chunks}</span>,
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
    solution: {
      approach: string;
      details: string[];
      result: string;
      category: string;
    };
  }>;

  // --- Architectural Decisions Data ---
  const decisionsData = {
    title: t("decisions.title"),
    subtitle: t("decisions.subtitle"),
    items: t.raw("decisions.items") as Array<{
      icon: string;
      title: string;
      reason: string;
      details: string[];
    }>,
  };

  // --- Gallery Data ---
  const galleryRaw = t.raw("gallery") as {
    tabs: { demo: string; screenshots: string };
    demo: Record<string, { title: string; desc: string }>;
    screenshots: Record<string, { title: string; desc: string }>;
  };

  const demoItems = [
    { key: "v1", file: "send_message-dark_theme.mp4" },
    { key: "v2", file: "resend_message-dark_theme.mp4" },
    { key: "v3", file: "delete_message-dark_theme.mp4" },
    { key: "v4", file: "pre-network-persistence-dark_theme.mp4" },
  ].map((item) => ({
    type: "video" as const,
    src: getMediaUrl(`/ai-chat-app/${item.file}`),
    alt: galleryRaw.demo[item.key]?.title || item.key,
    title: galleryRaw.demo[item.key]?.title,
    description: galleryRaw.demo[item.key]?.desc,
  }));

  const screenshotItems = [
    { key: "s1", file: "launch_screen-dark_theme.png" },
    { key: "s2", file: "launch_screen-light_theme.png" },
    { key: "s3", file: "either_chat_screen-dark_theme.png" },
    { key: "s4", file: "either_chat_screen-light_theme.png" },
  ].map((item) => ({
    type: "image" as const,
    src: getMediaUrl(`/ai-chat-app/${item.file}`),
    alt: galleryRaw.screenshots[item.key]?.title || item.key,
    title: galleryRaw.screenshots[item.key]?.title,
    description: galleryRaw.screenshots[item.key]?.desc,
  }));

  const galleryTabs = [
    { label: galleryRaw.tabs.demo, items: demoItems },
    { label: galleryRaw.tabs.screenshots, items: screenshotItems },
  ];

  // --- Core Implementation Data ---
  const coreImplementationRaw = t.raw("coreImplementation") as
    | {
        title: string;
        subtitle?: string;
        categories: Array<{
          icon: string;
          title: string;
          status?: "verified";
          items: string[];
        }>;
      }
    | undefined;

  // --- Roadmap Data ---
  const roadmapData = {
    title: t("roadmap.title"),
    subtitle: t("roadmap.subtitle"),
    categories: t.raw("roadmap.categories") as Array<{
      icon: string;
      title: string;
      items: string[];
    }>,
  };

  // --- Disclaimer ---
  const disclaimerText = t("disclaimer");

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      <ProjectHero
        {...heroData}
        gradientClass="from-cyan-600 via-blue-600 to-purple-500 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400"
        borderGradientClass="from-cyan-600/20 via-blue-600/20 to-purple-500/20"
      />
      <ProjectOverview {...overviewData} techBadgeColor="purple" focusBadgeColor="orange" />
      <TechnicalChallengeCard challenges={challengesRaw} />
      <ArchitecturalDecisions {...decisionsData} />
      <TabbedGallery title={commonT("projectShowcase")} tabs={galleryTabs} accentColor="blue" />
      {coreImplementationRaw && (
        <CoreImplementation
          title={coreImplementationRaw.title}
          subtitle={coreImplementationRaw.subtitle}
          categories={coreImplementationRaw.categories}
        />
      )}
      <FutureRoadmap {...roadmapData} />
      <SourceCodeLink href="https://github.com/a6232241/ai-chat-app" />
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
