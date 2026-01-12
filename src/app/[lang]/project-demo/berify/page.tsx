import { TabbedGallery } from "@components/shared/TabbedGallery";
import { LegalDisclaimer, ProjectHero, ProjectOverview } from "@features/portfolio/components";
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

  // --- Context Data ---
  const contextData = t.raw("context") as {
    title: string;
    description: string;
    architecture: Array<{ name: string; tech: string; desc: string }>;
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

  // --- Metrics Data ---
  const metricsData = t.raw("metrics") as {
    title: string;
    items: Array<{ value: string; label: string; desc: string }>;
  };

  // --- Challenges Data ---
  const challengesData = t.raw("challenges") as Array<{
    title: string;
    badge: string;
    achievement: string;
    details: string[];
    icon: string;
  }>;

  // --- Performance Data ---
  const performanceData = t.raw("performance") as {
    title: string;
    description: string;
    method: string;
    result: string;
  };

  // --- Architecture Flow Data ---
  const architectureFlowData = t.raw("architectureFlow") as {
    title: string;
    nodes: Record<string, { label: string; tech: string }>;
    flows: string[];
  };

  // --- Gallery Data (Tabbed) ---
  const galleryRaw = t.raw("gallery") as {
    tabs: { consumerApp: string; merchantDashboard: string };
    consumerApp: Record<string, { title: string; desc: string }>;
    merchantDashboard: Record<string, { title: string; desc: string }>;
  };

  const consumerAppItems = [
    { key: "home", file: "home_screen.png" },
    { key: "productDetail", file: "product_detail_screen.png" },
    { key: "productDetailChat", file: "product_detail_screen-show_chat.png" },
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
    { key: "inventory", file: "CMS-inventory_page.png" },
    { key: "experience", file: "CMS-experience_page.png" },
    { key: "experienceDetail", file: "CMS-experience_detail_page.png" },
    { key: "analytics", file: "CMS-analytics_page.png" },
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

  // --- Disclaimer ---
  const disclaimerText = t("disclaimer");

  // Helper to render markdown bold
  const renderBoldText = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="font-bold text-purple-600 dark:text-purple-400">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      {/* Hero Section with Dual Badges */}
      <section>
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-semibold text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
            {t("hero.badge")}
          </span>
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

      {/* Project Context Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{contextData.title}</h2>
        <p className="mb-6 text-gray-600 dark:text-gray-400">{contextData.description}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {contextData.architecture.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200/50 bg-white/70 p-4 dark:border-gray-700/50 dark:bg-gray-800/70">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">{item.name}</span>
                <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
                  {item.tech}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Overview Section */}
      <ProjectOverview {...overviewData} techBadgeColor="purple" focusBadgeColor="purple" />

      {/* Metrics Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-purple-50 to-white p-8 dark:border-purple-700/30 dark:from-purple-900/20 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{metricsData.title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {metricsData.items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-purple-600 dark:text-purple-400">{item.value}</div>
              <div className="mb-1 font-semibold text-gray-900 dark:text-white">{item.label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Challenges Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">🎯 {commonT("keyContributions")}</h2>
        <div className="space-y-6">
          {challengesData.map((challenge, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200/50 bg-white/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 dark:border-gray-700/50 dark:bg-gray-800/50">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="text-2xl">{challenge.icon}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{challenge.title}</h3>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
                  {challenge.badge}
                </span>
              </div>

              <p className="mb-4 text-gray-700 dark:text-gray-300">{renderBoldText(challenge.achievement)}</p>

              <ul className="grid gap-2 md:grid-cols-2">
                {challenge.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{architectureFlowData.title}</h2>

        {/* Nodes Grid */}
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(architectureFlowData.nodes).map(([key, node]) => {
            const colorMap: Record<string, string> = {
              app: "bg-blue-100 border-blue-300 dark:bg-blue-900/30 dark:border-blue-700",
              merchant: "bg-orange-100 border-orange-300 dark:bg-orange-900/30 dark:border-orange-700",
              web: "bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-700",
              queue: "bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-700",
              db: "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600",
              shopify: "bg-lime-100 border-lime-300 dark:bg-lime-900/30 dark:border-lime-700",
              sns: "bg-yellow-100 border-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-700",
              web3: "bg-pink-100 border-pink-300 dark:bg-pink-900/30 dark:border-pink-700",
            };
            return (
              <div
                key={key}
                className={`rounded-lg border-2 p-3 text-center ${colorMap[key] || "border-gray-300 bg-gray-100"}`}>
                <div className="font-semibold text-gray-900 dark:text-white">{node.label}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{node.tech}</div>
              </div>
            );
          })}
        </div>

        {/* Flow Connections */}
        <div className="rounded-xl bg-gray-100/50 p-4 dark:bg-gray-800/50">
          <h3 className="mb-3 text-sm font-semibold text-gray-700 uppercase dark:text-gray-300">Data Flow</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {architectureFlowData.flows.map((flow, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-purple-500">→</span>
                {flow}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-blue-50 to-white p-8 dark:border-blue-700/30 dark:from-blue-900/20 dark:to-gray-800/50">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{performanceData.title}</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">{performanceData.description}</p>
        <div className="rounded-xl bg-white/70 p-4 dark:bg-gray-800/70">
          <p className="mb-2 text-gray-700 dark:text-gray-300">{renderBoldText(performanceData.method)}</p>
          <p className="font-semibold text-blue-800 dark:text-blue-200">📈 {renderBoldText(performanceData.result)}</p>
        </div>
      </section>

      {/* Tabbed Gallery Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">📸 {commonT("projectDemo")}</h2>
        <TabbedGallery tabs={galleryTabs} accentColor="purple" itemAspectRatio="aspect-[9/16]" />
      </section>

      {/* Disclaimer */}
      <LegalDisclaimer text={disclaimerText} />
    </main>
  );
}
