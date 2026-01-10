import {
  ArchitecturalDecisions,
  CoreImplementation,
  FutureRoadmap,
  LegalDisclaimer,
  MusicPlayerEvidence,
  ProjectHero,
  ProjectOverview,
  SourceCodeLink,
  TechnicalChallengeCard,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

export default async function AIChatAppPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "projects.aiChatApp.detail" });

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

  // --- Evidence Data ---
  const evidenceData = {
    videos: [
      {
        id: 1,
        title: t("evidence.videos.v1.title"),
        desc: t("evidence.videos.v1.desc"),
        fileUrl: getMediaUrl("/ai-chat-app/send_message-dark_theme.mp4"),
      },
      {
        id: 2,
        title: t("evidence.videos.v2.title"),
        desc: t("evidence.videos.v2.desc"),
        fileUrl: getMediaUrl("/ai-chat-app/resend_message-dark_theme.mp4"),
      },
      {
        id: 3,
        title: t("evidence.videos.v3.title"),
        desc: t("evidence.videos.v3.desc"),
        fileUrl: getMediaUrl("/ai-chat-app/delete_message-dark_theme.mp4"),
      },
      {
        id: 4,
        title: t("evidence.videos.v4.title"),
        desc: t("evidence.videos.v4.desc"),
        fileUrl: getMediaUrl("/ai-chat-app/pre-network-persistence-dark_theme.mp4"),
      },
    ],
    screenshots: [
      {
        id: 1,
        title: t("evidence.screenshots.s1.title"),
        desc: t("evidence.screenshots.s1.desc"),
        imageUrl: getMediaUrl("/ai-chat-app/launch_screen-dark_theme.png"),
      },
      {
        id: 2,
        title: t("evidence.screenshots.s2.title"),
        desc: t("evidence.screenshots.s2.desc"),
        imageUrl: getMediaUrl("/ai-chat-app/launch_screen-light_theme.png"),
      },
      {
        id: 3,
        title: t("evidence.screenshots.s3.title"),
        desc: t("evidence.screenshots.s3.desc"),
        imageUrl: getMediaUrl("/ai-chat-app/either_chat_screen-dark_theme.png"),
      },
      {
        id: 4,
        title: t("evidence.screenshots.s4.title"),
        desc: t("evidence.screenshots.s4.desc"),
        imageUrl: getMediaUrl("/ai-chat-app/either_chat_screen-light_theme.png"),
      },
    ],
  };

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
      <MusicPlayerEvidence {...evidenceData} />
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
