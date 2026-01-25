import { TabbedGallery } from "@components/shared/TabbedGallery";
import {
  ProjectHero,
  ProjectOverview,
  StoreSection,
  TechnicalSpotlight,
  type SpotlightItem,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { Circle, Database, Network, Server, Smartphone, Zap } from "lucide-react";
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
    groupA: {
      title: string;
      items: Array<{ value: string; label: string; desc: string }>;
    };
    groupB: {
      title: string;
      items: Array<{ title: string; desc: string }>;
    };
    technicalBreakthrough: {
      label: string;
      desc: string;
    };
  };

  // --- Architecture Flow Data ---
  const architectureFlowData = t.raw("architectureFlow") as {
    title: string;
    steps: Array<{ step: string; title: string; desc: string; metric?: string }>;
    metricsDivider?: string;
  };

  // --- Technical Spotlight Data ---
  const technicalSpotlightData = t.raw("technicalSpotlight") as SpotlightItem[];

  // --- Technical Challenges Data ---
  const technicalChallengesData = t.raw("technicalChallenges") as SpotlightItem[];

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
    { key: "rewards", file: "rewards_screen.png" },
    { key: "rewardsDetail", file: "rewards_detail_screen.png" },
    { key: "notifications", file: "notifications_screen.png" },
    { key: "profile", file: "profile_screen.png" },
    { key: "scanHistory", file: "scan_history_screen.png" },
  ].map((item) => ({
    type: "image" as const,
    src: getMediaUrl(`/berify/${item.file}`),
    alt: galleryRaw.consumerApp[item.key]?.title || item.key,
    title: galleryRaw.consumerApp[item.key]?.title,
    description: galleryRaw.consumerApp[item.key]?.desc,
  }));

  const merchantDashboardItems = [
    { key: "dashboard", file: "CMS-analytics_page.png" },
    { key: "inventory", file: "CMS-inventory_page.png" },
    { key: "experience", file: "CMS-experience_page.png" },
    { key: "experienceDetail", file: "CMS-experience_detail_page.png" },
    { key: "rewards", file: "CMS-rewards_page.png" },
    { key: "account", file: "CMS-account_page.png" },
  ].map((item) => ({
    type: "image" as const,
    src: getMediaUrl(`/berify/${item.file}`),
    alt: galleryRaw.merchantDashboard[item.key]?.title || item.key,
    title: galleryRaw.merchantDashboard[item.key]?.title,
    description: galleryRaw.merchantDashboard[item.key]?.desc,
  }));

  const galleryTabs = [
    { label: galleryRaw.tabs.consumerApp, items: consumerAppItems },
    { label: galleryRaw.tabs.merchantDashboard, items: merchantDashboardItems },
  ];

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
      <section className="rounded-2xl border border-slate-800 bg-white p-8 dark:bg-gray-900/50">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Network className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{architectureFlowData.title}</h2>
        </div>

        {/* Process Flow */}
        <div className="mb-8">
          <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-0">
            {architectureFlowData.steps.map((step, index) => {
              // Icon mapping based on step index
              const icons = [Smartphone, Server, Database, Zap];
              const StepIcon = icons[index] || Circle;

              return (
                <div key={index} className="group relative flex flex-1 flex-col items-center text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 ring-1 ring-gray-200 transition-all group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-200 dark:bg-gray-800 dark:text-gray-500 dark:ring-gray-700 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400 dark:group-hover:ring-blue-800">
                    <StepIcon className="h-6 w-6" />
                  </div>

                  <div className="px-2">
                    <div className="mb-1 font-bold text-gray-900 dark:text-white">{step.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{step.desc}</div>
                    {step.metric && (
                      <div className="mt-2 inline-block rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {step.metric}
                      </div>
                    )}
                  </div>

                  {/* Connector Line */}
                  {index < architectureFlowData.steps.length - 1 && (
                    <div className="absolute top-6 left-1/2 -z-10 hidden w-full -translate-y-1/2 px-12 md:block">
                      <div className="h-px w-full border-t border-dashed border-gray-300 dark:border-gray-700"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider with Text */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative bg-white px-6 text-sm font-medium text-gray-500 dark:bg-gray-900">
            {architectureFlowData.metricsDivider || "Core Engineering Metrics"}
          </div>
        </div>

        {/* Metrics Container - Two Groups */}
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Group A: System Scale */}
          <div className="flex-1">
            <h3 className="mb-4 text-center text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
              {architectureMetrics.groupA.title}
            </h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {architectureMetrics.groupA.items.map((item, index) => (
                <div
                  key={`groupA-${index}`}
                  className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-3 text-center dark:bg-gray-800/50">
                  <div className="mb-1 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                    {item.value}
                  </div>
                  <div className="mb-1 text-xs font-bold text-gray-900 dark:text-white">{item.label}</div>
                  <div className="text-[10px] leading-tight text-gray-500 dark:text-gray-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden w-px bg-gray-200 md:block dark:bg-gray-700"></div>

          {/* Group B: Engineering Ownership (Highlighted - Text Blocks) */}
          <div className="relative flex-[1.5]">
            <div className="pointer-events-none absolute -inset-2 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-sm"></div>
            <div className="relative flex h-full flex-col justify-center rounded-xl border border-purple-100 bg-purple-50/50 p-6 dark:border-purple-900/30 dark:bg-purple-900/10">
              <h3 className="mb-6 text-center text-sm font-bold tracking-wider text-purple-700 uppercase dark:text-purple-300">
                {architectureMetrics.groupB.title}
              </h3>
              <div className="flex flex-col gap-6">
                {architectureMetrics.groupB.items.map((item, index) => (
                  <div key={`groupB-${index}`} className="flex flex-col text-left">
                    <div className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
                      {item.title}
                    </div>
                    <div className="xs:text-sm pl-3.5 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Breakthrough Label */}
        {architectureMetrics.technicalBreakthrough && (
          <div className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 pr-6 text-sm text-orange-800 shadow-sm dark:border-orange-900/30 dark:bg-orange-900/20 dark:text-orange-200">
              <span className="flex h-6 items-center justify-center rounded-full bg-orange-500 px-2 text-[10px] font-bold tracking-wider text-white uppercase">
                {architectureMetrics.technicalBreakthrough.label}
              </span>
              <span className="text-xs font-medium sm:text-sm">{architectureMetrics.technicalBreakthrough.desc}</span>
            </div>
          </div>
        )}
      </section>

      {/* Technical Spotlight (Consolidated Tabs) */}
      <TechnicalSpotlight title={commonT("technicalSpotlight")} items={technicalSpotlightData} />

      {/* Technical Challenges */}
      <TechnicalSpotlight title={commonT("technicalChallenges")} items={technicalChallengesData} />

      {/* Gallery Section */}
      <TabbedGallery tabs={galleryTabs} title={commonT("projectShowcase")} />

      {/* Store Section */}
      <StoreSection {...storeLink} />

      {/* Disclaimer */}
      <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        {t("disclaimer")}
      </div>
    </main>
  );
}
