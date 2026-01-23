import { TabbedGallery } from "@components/shared/TabbedGallery";
import { ProjectHero, ProjectOverview, TechnicalSpotlight, type SpotlightItem } from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

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
    description: t("hero.description"),
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
  };

  // --- Ecosystem Metrics Data ---
  const ecosystemMetricsData = t.raw("ecosystemMetrics") as {
    title: string;
    items: Array<{ value: string; label: string; desc: string }>;
  };

  // --- Metrics Data ---
  const metricsData = t.raw("metrics") as {
    title: string;
    items: Array<{ value: string; label: string; desc: string }>;
  };

  // --- Architecture Flow Data ---
  const architectureFlowData = t.raw("architectureFlow") as {
    title: string;
    steps: Array<{ step: string; title: string; desc: string; metric?: string }>;
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
    thirdParty: { shopify: string; arbitrum: string };
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
    <main className="container mx-auto flex max-w-6xl flex-col gap-16 px-6 py-12">
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
      <ProjectOverview {...overviewData} techBadgeColor="purple" focusBadgeColor="purple" />

      {/* Metrics Grid (Split System & Personal) */}
      <section className="rounded-2xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900/50">
        {/* Header with Badges */}
        <div className="mb-8 border-b border-gray-100 pb-4 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{ecosystemMetricsData.title}</h2>
        </div>

        <div className="space-y-8">
          {/* Ecosystem Scale */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {ecosystemMetricsData.items.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <div className="mb-1 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
                  {item.value}
                </div>
                <div className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>

          {/* Divider with Label */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dashed border-gray-200 dark:border-gray-700"></div>
            </div>
            <div className="relative bg-white px-4 text-sm font-medium text-gray-500 dark:bg-gray-900">
              {metricsData.title}
            </div>
          </div>

          {/* Personal Impact */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
            {metricsData.items.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center text-center">
                <div className="mb-1 text-3xl font-bold tracking-tight text-purple-600 dark:text-purple-400">
                  {item.value}
                </div>
                <div className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Flow (Horizontal) */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 p-8 text-white">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <h2 className="relative z-10 mb-8 text-xl font-bold">{architectureFlowData.title}</h2>
        <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-start md:gap-0">
          {architectureFlowData.steps.map((step, index) => (
            <div key={index} className="group relative flex flex-1 flex-col items-center text-center">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 font-bold ring-1 ring-white/20 backdrop-blur-md transition-all group-hover:bg-white group-hover:text-purple-600">
                {step.step}
              </div>

              <div className="px-2">
                <div className="mb-1 font-semibold">{step.title}</div>
                <div className="text-xs text-purple-200">{step.desc}</div>
                {step.metric && (
                  <div className="mt-2 inline-block rounded bg-purple-500/30 px-2 py-0.5 text-[10px] font-medium tracking-wide">
                    {step.metric}
                  </div>
                )}
              </div>

              {/* Connector Line */}
              {index < architectureFlowData.steps.length - 1 && (
                <div
                  className="absolute top-5 left-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-white/10 via-white/30 to-white/10 md:block"
                  style={{ left: "50%", width: "100%" }}
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Spotlight (Consolidated Tabs) */}
      <TechnicalSpotlight title={commonT("technicalSpotlight")} items={technicalSpotlightData} />

      {/* Technical Challenges */}
      <TechnicalSpotlight title={commonT("technicalChallenges")} items={technicalChallengesData} />

      {/* Gallery Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{commonT("projectShowcase")}</h2>
        <TabbedGallery tabs={galleryTabs} />
      </section>

      {/* Disclaimer */}
      <div className="rounded-lg bg-gray-50 p-4 text-center text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        {t("disclaimer")}
      </div>
    </main>
  );
}
