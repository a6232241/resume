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
  const architectureMetrics = t.raw("architectureMetrics") as Array<{
    title: string;
    metric: string;
    desc: string | string[];
  }>;
  const architectureMetricsTitle = t("architectureMetricsTitle");

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
      <section className="rounded-2xl border border-gray-200 bg-white p-6 backdrop-blur-sm transition-all dark:border-gray-800 dark:bg-gray-900/50">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            <Network className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{architectureFlowData.title}</h2>
        </div>

        {/* Process Flow (Condensed) */}
        <div className="mb-6">
          <div className="relative flex flex-col gap-2 md:flex-row md:items-start md:gap-0">
            {architectureFlowData.steps.map((step, index) => {
              const icons = [Smartphone, Server, Database, Zap];
              const StepIcon = icons[index] || Circle;

              return (
                <div key={index} className="group relative flex flex-1 flex-col items-center text-center">
                  <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gray-50 text-gray-400 ring-1 ring-gray-200 transition-all group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:ring-blue-200 dark:bg-gray-800 dark:text-gray-500 dark:ring-gray-700 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400 dark:group-hover:ring-blue-800">
                    <StepIcon className="h-4 w-4" />
                  </div>

                  <div className="px-1">
                    <div className="mb-0.5 text-base font-bold text-gray-900 dark:text-white">{step.title}</div>
                    <div className="scale-90 text-sm text-gray-500 dark:text-gray-200">{step.desc}</div>
                  </div>

                  {/* Connector Line */}
                  {index < architectureFlowData.steps.length - 1 && (
                    <div className="absolute top-4 left-1/2 -z-10 hidden w-full -translate-y-1/2 px-8 md:block">
                      <div className="h-px w-full border-t border-dashed border-gray-200 dark:border-gray-800"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Engineering Ownership Section */}
        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="rounded-lg bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <Server className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">{architectureMetricsTitle}</h2>
        </div>

        {/* Metrics Grid (3 Columns) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {architectureMetrics.map((item, index) => {
            return (
              <div
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all dark:border-gray-800 dark:bg-gray-900">
                {/* --- System Context Layer (Top - Dark) --- */}
                <div className="flex min-h-[6rem] flex-col justify-between bg-gray-50 px-5 py-5 dark:bg-gray-800/50">
                  <div className="text-xs font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    {item.title}
                  </div>
                  <div className="text-lg leading-tight font-bold text-gray-900 dark:text-white">{item.metric}</div>
                </div>

                {/* --- Separator Line --- */}
                <div className="h-px w-full bg-purple-100 dark:bg-purple-900/50"></div>

                {/* --- Individual Impact Layer (Bottom - Light) --- */}
                <div className="flex flex-1 flex-col p-5 pt-6">
                  {/* Action Items */}
                  <div className="mt-auto text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    <ul className="flex flex-col gap-3 pl-1">
                      {Array.isArray(item.desc) ? (
                        item.desc.map((point: string, idx: number) => {
                          return (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-400 dark:bg-purple-500" />
                              <span className="leading-snug">{point}</span>
                            </li>
                          );
                        })
                      ) : (
                        <span className="leading-snug">{item.desc}</span>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
