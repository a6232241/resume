import { ProjectHero, ProjectOverview } from "@features/portfolio/components";
import { SourceCodeLink } from "@src/features/portfolio";
import { getTranslations } from "next-intl/server";
import { FutureRoadmap, LegalDisclaimer, MusicPlayerEvidence, TechnicalChallengeCard } from "./components";

export default async function MusicPlayerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "projects.musicPlayer.detail" });

  // --- 1. Hero Data ---
  const heroData = {
    title: t("hero.title"),
    tagline: t("hero.tagline"),
    summary: {
      problem: {
        title: t("hero.summary.problem.title"),
        desc: t.rich("hero.summary.problem.desc", {
          highlight: (chunks) => <span className="font-bold text-purple-600 dark:text-purple-400">{chunks}</span>,
        }),
      },
      solution: {
        title: t("hero.summary.solution.title"),
        desc: t("hero.summary.solution.desc"),
      },
      impact: {
        title: t("hero.summary.impact.title"),
        desc: t.rich("hero.summary.impact.desc", {
          highlight: (chunks) => <span className="font-bold text-orange-600 dark:text-orange-400">{chunks}</span>,
        }),
      },
    },
  };

  // --- 2. Overview Data ---
  const overviewData = {
    overview: {
      duration: t("overview.duration"),
      team: t("overview.team"),
      projectType: t("overview.projectType"),
      focus: t("overview.focus"),
      mainTechs: t.raw("overview.mainTechs") as string[],
      platforms: t.raw("overview.platforms") as string[],
    },
  };

  // --- 3. Challenges Data ---
  // Get raw challenges data from i18n
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

  // --- 4. Evidence Data ---
  const evidenceRaw = t.raw("evidence") as {
    videos: Array<{
      id: number;
      title: string;
      description: string;
      fileUrl: string;
    }>;
    screenshots: Array<{
      id: number;
      title: string;
      description: string;
      imageUrl: string;
    }>;
  };

  // --- 5. Roadmap Data ---
  const roadmapData = {
    title: t("roadmap.title"),
    categories: t.raw("roadmap.categories") as Array<{
      icon: string;
      title: string;
      items: string[];
    }>,
  };

  // --- 6. Disclaimer ---
  const disclaimerText = t("disclaimer");

  return (
    <main className="container mx-auto max-w-6xl px-6 py-12">
      <ProjectHero
        title={heroData.title}
        tagline={heroData.tagline}
        summary={{
          problem: {
            icon: "🎯",
            title: heroData.summary.problem.title,
            desc: heroData.summary.problem.desc,
          },
          solution: {
            icon: "💡",
            title: heroData.summary.solution.title,
            desc: heroData.summary.solution.desc,
          },
          impact: {
            icon: "🚀",
            title: heroData.summary.impact.title,
            desc: heroData.summary.impact.desc,
          },
        }}
        gradient={{ from: "purple-600", via: "pink-600", to: "orange-500" }}
      />
      <ProjectOverview overview={overviewData.overview} techBadgeColor="purple" focusBadgeColor="orange" />
      <TechnicalChallengeCard challenges={challengesRaw} />
      <MusicPlayerEvidence videos={evidenceRaw.videos} screenshots={evidenceRaw.screenshots} />
      <FutureRoadmap {...roadmapData} />
      <SourceCodeLink href="https://github.com/a6232241/music-player" />
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
