import { ProjectHero, ProjectOverview, TechnicalSpotlight, type SpotlightItem } from "@features/portfolio/components";
import { getTranslations } from "next-intl/server";

export default async function SportCompetitionPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [t, commonT] = await Promise.all([
    getTranslations({ locale: lang, namespace: "projects.sportCompetition.detail" }),
    getTranslations({ locale: lang, namespace: "projects" }),
  ]);

  // --- Hero Data ---
  const heroData = {
    title: t("hero.title"),
    tagline: t("hero.tagline"),
  };

  // --- Overview Data ---
  const overviewData = {
    overview: {
      duration: t("overview.duration"),
      team: t("overview.team"),
      projectType: t("overview.projectType"),
      mainTechs: t.raw("overview.mainTechs") as string[],
      platforms: t.raw("overview.platforms") as string[],
    },
    description: t.rich("overview.description", {
      b: (chunks) => <span className="font-bold text-purple-600 dark:text-purple-400">{chunks}</span>,
    }),
  };

  // --- Technical Challenges Data ---
  const technicalSpotlightRaw = t.raw("technicalSpotlight") as SpotlightItem[];

  const technicalSpotlightData = technicalSpotlightRaw.map((item) => ({
    ...item,
  }));

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
      {/* Hero Section */}
      <ProjectHero
        {...heroData}
        gradientClass="from-red-600 via-orange-600 to-amber-600 dark:from-red-400 dark:via-orange-400 dark:to-amber-400"
        borderGradientClass="from-red-600/20 via-orange-600/20 to-amber-600/20"
      />

      {/* Overview Section */}
      <ProjectOverview {...overviewData} techBadgeColor="purple" />

      {/* Technical Challenges */}
      <TechnicalSpotlight title={commonT("technicalSpotlight")} items={technicalSpotlightData} />

      {/* Disclaimer */}
      <div className="mt-4 text-center text-xs text-slate-500">{t("disclaimer")}</div>
    </main>
  );
}
