import {
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

export default async function MusicPlayerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "projects.musicPlayer.detail" });

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
          highlight: (chunks) => <span className="font-bold text-orange-600 dark:text-orange-400">{chunks}</span>,
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

  // --- Evidence Data ---
  const evidenceRaw = t.raw("evidence") as {
    videos: Record<string, { title: string; desc: string }>;
    screenshots: Record<string, { title: string; desc: string }>;
  };

  const evidenceData = {
    videos: [
      {
        ...evidenceRaw.videos.v1,
        fileUrl: getMediaUrl("/music-player/filter_music.mp4"),
      },
      {
        ...evidenceRaw.videos.v2,
        fileUrl: getMediaUrl("/music-player/show_music_detail_modal.mp4"),
      },
      {
        ...evidenceRaw.videos.v3,
        fileUrl: getMediaUrl("/music-player/download_all_audios.mp4"),
      },
      {
        ...evidenceRaw.videos.v4,
        fileUrl: getMediaUrl("/music-player/upload_audio.mp4"),
      },
    ],
    screenshots: [
      {
        ...evidenceRaw.screenshots.s1,
        imageUrl: getMediaUrl("/music-player/launch_screen-light_theme.png"),
      },
      {
        ...evidenceRaw.screenshots.s2,
        imageUrl: getMediaUrl("/music-player/launch_screen-dark_theme.png"),
      },
      {
        ...evidenceRaw.screenshots.s3,
        imageUrl: getMediaUrl("/music-player/home_screen-light_theme.png"),
      },
      {
        ...evidenceRaw.screenshots.s4,
        imageUrl: getMediaUrl("/music-player/home_screen-dark_theme.png"),
      },
      {
        ...evidenceRaw.screenshots.s5,
        imageUrl: getMediaUrl("/music-player/profile_screen-light_theme.png"),
      },
      {
        ...evidenceRaw.screenshots.s6,
        imageUrl: getMediaUrl("/music-player/profile_screen-dark_theme.png"),
      },
    ],
  };

  // --- Roadmap Data ---
  const roadmapData = {
    title: t("roadmap.title"),
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
        gradientClass="from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400"
        borderGradientClass="from-purple-600/20 via-pink-600/20 to-orange-500/20"
      />
      <ProjectOverview {...overviewData} techBadgeColor="purple" focusBadgeColor="orange" />
      <TechnicalChallengeCard challenges={challengesRaw} />
      <MusicPlayerEvidence {...evidenceData} />
      <FutureRoadmap {...roadmapData} />
      <SourceCodeLink href="https://github.com/a6232241/music-player" />
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
