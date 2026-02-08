import { TabbedGallery } from "@components/shared/TabbedGallery/TabbedGallery";
import {
  FutureRoadmap,
  LegalDisclaimer,
  ProjectHero,
  ProjectOverview,
  SourceCodeLink,
  TechnicalSpotlight,
  type SpotlightItem,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

export default async function MusicPlayerPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [t, commonT] = await Promise.all([
    getTranslations({ locale: lang, namespace: "projects.musicPlayer.detail" }),
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
    description: t("overview.description"),
  };

  // --- Technical Spotlight Data ---
  const technicalSpotlightData = t.raw("technicalSpotlight") as SpotlightItem[];

  // --- Gallery Data ---
  const galleryRaw = t.raw("gallery") as {
    tabs: { demo: string; screenshots: string };
    demo: Record<string, { title: string; desc: string }>;
    screenshots: Record<string, { title: string; desc: string }>;
  };

  const demoItems = [
    { key: "v1", file: "filter_music.mp4" },
    { key: "v2", file: "show_music_detail_modal.mp4" },
    { key: "v3", file: "download_all_audios.mp4" },
    { key: "v4", file: "upload_audio.mp4" },
  ].map((item) => ({
    type: "video" as const,
    src: getMediaUrl(`/music-player/${item.file}`),
    alt: galleryRaw.demo[item.key]?.title || item.key,
    title: galleryRaw.demo[item.key]?.title,
    description: galleryRaw.demo[item.key]?.desc,
  }));

  const screenshotItems = [
    { key: "s1", file: "launch_screen-light_theme.png" },
    { key: "s2", file: "launch_screen-dark_theme.png" },
    { key: "s3", file: "home_screen-light_theme.png" },
    { key: "s4", file: "home_screen-dark_theme.png" },
    { key: "s5", file: "profile_screen-light_theme.png" },
    { key: "s6", file: "profile_screen-dark_theme.png" },
  ].map((item) => ({
    type: "image" as const,
    src: getMediaUrl(`/music-player/${item.file}`),
    alt: galleryRaw.screenshots[item.key]?.title || item.key,
    title: galleryRaw.screenshots[item.key]?.title,
    description: galleryRaw.screenshots[item.key]?.desc,
  }));

  const galleryTabs = [
    { label: galleryRaw.tabs.demo, items: demoItems },
    { label: galleryRaw.tabs.screenshots, items: screenshotItems },
  ];

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
      <ProjectOverview {...overviewData} techBadgeColor="purple" />
      <TechnicalSpotlight title={commonT("technicalSpotlight")} items={technicalSpotlightData} />
      <TabbedGallery title={commonT("projectShowcase")} tabs={galleryTabs} accentColor="orange" />
      <FutureRoadmap {...roadmapData} />
      <SourceCodeLink href="https://github.com/a6232241/music-player" />
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
