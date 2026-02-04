import {
  BerifyEngineeringSection,
  ProjectHero,
  ProjectOverview,
  ShowcaseGallery,
  StoreSection,
  TechnicalSpotlight,
  type SpotlightItem,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

const storeLink = {
  appleAppStoreLink: "https://apps.apple.com/us/app/berify/id1526630785",
  googlePlayStoreLink: "https://play.google.com/store/apps/details?id=com.berify",
  websiteLink: "https://dashboard.berify.io/auth/sign-in",
};

export default async function BerifyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const [t, commonT] = await Promise.all([
    getTranslations({ locale: lang, namespace: "projects.berify.detail" }),
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

  // --- Architecture Metrics Data (New Structure) ---
  const architectureMetrics = t.raw("architectureMetrics") as {
    title: string;
    list: Array<{
      title: string;
      metric: string;
      desc: string | string[];
    }>;
  };

  // --- Architecture Flow Data ---
  const architectureFlowData = t.raw("architectureFlow") as {
    title: string;
    steps: Array<{ step: string; title: string; desc: string; metric?: string }>;
  };

  // --- Technical Challenges Data ---
  const technicalSpotlightRaw = t.raw("technicalSpotlight") as SpotlightItem[];

  const technicalSpotlightData = technicalSpotlightRaw.map((item) => ({
    ...item,
    showcase:
      item.id === "optimize-and-refactor-rewards"
        ? {
            type: "video" as const,
            src: getMediaUrl("/berify/technical-spotlight-optimize-and-refactor-rewards.mp4"),
            alt: "Optimize and Refactor Rewards",
          }
        : undefined,
  }));

  // --- Gallery Data (Tabbed) ---
  const galleryRaw = t.raw("gallery") as {
    tabs: { consumerApp: string; merchantDashboard: string };
    consumerApp: Record<string, { title: string; desc: string }>;
    merchantDashboard: Record<string, { title: string; desc: string }>;
  };

  const consumerAppItems = [
    { key: "home", file: "home_screen.png" },
    { key: "productDetail", file: "product_detail_screen.png" },
    { key: "chat", file: "product_detail_screen-show_chat.png" },
    { key: "rewardsDetail", file: "rewards_detail_screen.png" },
    { key: "scanHistory", file: "scan_history_screen.png" },
  ].map((item) => ({
    type: "image" as const,
    src: getMediaUrl(`/berify/${item.file}`),
    alt: galleryRaw.consumerApp[item.key]?.title || item.key,
    title: galleryRaw.consumerApp[item.key]?.title,
    description: galleryRaw.consumerApp[item.key]?.desc,
  }));

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12">
      {/* Hero Section */}
      <section>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-800 dark:bg-green-900/50 dark:text-green-200">
            ✓ {t("hero.statusBadge")}
          </span>
        </div>
        <ProjectHero
          {...heroData}
          gradientClass="from-purple-600 via-violet-600 to-indigo-600 dark:from-purple-400 dark:via-violet-400 dark:to-indigo-400"
          borderGradientClass="from-purple-600/20 via-violet-600/20 to-indigo-600/20"
        />
      </section>

      {/* Overview Section */}
      <ProjectOverview {...overviewData} techBadgeColor="purple" />

      {/* Unified System Architecture & Metrics Section */}
      <BerifyEngineeringSection architectureFlowData={architectureFlowData} architectureMetrics={architectureMetrics} />

      {/* Technical Challenges */}
      <TechnicalSpotlight title={commonT("technicalSpotlight")} items={technicalSpotlightData} />

      {/* Gallery Section */}
      <ShowcaseGallery items={consumerAppItems} title={commonT("projectShowcase")} />

      {/* Store Section */}
      <StoreSection {...storeLink} />

      {/* Disclaimer */}
      <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        {t("disclaimer")}
      </div>
    </main>
  );
}
