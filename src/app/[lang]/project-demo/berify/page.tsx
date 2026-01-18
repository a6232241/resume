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

  // --- Quality Metrics Data ---
  const qualityMetricsData = t.raw("qualityMetrics") as {
    title: string;
    items: Array<{ icon: string; label: string; desc: string }>;
  };

  // --- IDV Deep Dive Data ---
  const idvDeepDiveData = t.raw("idvDeepDive") as {
    title: string;
    overview: {
      title: string;
      description: string;
      items: string[];
    };
    workflow: {
      title: string;
      steps: Array<{ step: string; title: string; desc: string }>;
    };
    risks: {
      title: string;
      items: Array<{ icon: string; name: string; desc: string }>;
    };
    codeSnippet?: {
      title: string;
      language: string;
      code: string;
    };
  };

  // --- Collection System Data ---
  const collectionSystemData = t.raw("collectionSystem") as {
    title: string;
    overview: {
      title: string;
      description: string;
      items: string[];
    };
    architecture: {
      title: string;
      layers: Array<{ name: string; desc: string; role: string }>;
    };
    features: {
      title: string;
      items: Array<{ icon: string; title: string; desc: string }>;
    };
    codeSnippet?: {
      title: string;
      language: string;
      code: string;
    };
  };

  // --- Challenges Data (with code snippets) ---
  const challengesData = t.raw("challenges") as Array<{
    title: string;
    badge: string;
    achievement: string;
    details: string[];
    icon: string;
    codeSnippet?: {
      title: string;
      language: string;
      code: string;
    };
  }>;

  // --- Architecture Flow Data ---
  const architectureFlowData = t.raw("architectureFlow") as {
    title: string;
    steps: Array<{ step: string; title: string; desc: string; metric?: string }>;
  };

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

  const disclaimerText = t("disclaimer");

  // Helper to render markdown bold and code
  const renderBoldText = (text: string) => {
    // Handle both **bold** and `code` patterns
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={i} className="font-bold text-purple-600 dark:text-purple-400">
            {part.slice(2, -2)}
          </span>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="rounded bg-gray-200 px-1 text-sm dark:bg-gray-700">
            {part.slice(1, -1)}
          </code>
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

      {/* Ecosystem Scale Metrics */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-emerald-50 to-white p-8 dark:border-emerald-700/30 dark:from-emerald-900/20 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{ecosystemMetricsData.title}</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {ecosystemMetricsData.items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-emerald-600 dark:text-emerald-400">{item.value}</div>
              <div className="mb-1 font-semibold text-gray-900 dark:text-white">{item.label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Flow Section */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-gray-50 to-white p-8 dark:border-gray-700/50 dark:from-gray-900/50 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{architectureFlowData.title}</h2>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-2">
          {architectureFlowData.steps.map((step, index) => (
            <div key={index} className="flex flex-1 flex-col items-center">
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
                {step.step}
                {index < architectureFlowData.steps.length - 1 && (
                  <div
                    className="absolute top-1/2 left-full hidden h-0.5 w-full -translate-y-1/2 bg-purple-200 lg:block dark:bg-purple-800"
                    style={{ width: "calc(100% + 2rem)" }}
                  />
                )}
              </div>
              <div className="w-full px-1 text-center">
                <div className="mb-1 font-bold text-gray-900 dark:text-white">{step.title}</div>
                {step.metric && (
                  <div className="mb-1 inline-block rounded bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200">
                    {step.metric}
                  </div>
                )}
                <div className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</div>
              </div>
              {index < architectureFlowData.steps.length - 1 && (
                <div className="my-2 h-8 w-0.5 bg-purple-200 lg:hidden dark:bg-purple-800" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* IDV Deep Dive Section */}
      <section className="rounded-2xl border-2 border-purple-200/50 bg-gradient-to-br from-purple-50 via-indigo-50 to-white p-8 dark:border-purple-700/30 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{idvDeepDiveData.title}</h2>

        {/* Overview */}
        <div className="mb-8 rounded-xl border border-purple-200/50 bg-white/70 p-6 dark:border-purple-700/50 dark:bg-gray-800/70">
          <h3 className="mb-3 text-lg font-semibold text-purple-800 dark:text-purple-300">
            {idvDeepDiveData.overview.title}
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{idvDeepDiveData.overview.description}</p>
          <ul className="space-y-2">
            {idvDeepDiveData.overview.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                {renderBoldText(item)}
              </li>
            ))}
          </ul>
        </div>

        {/* Verification Workflow */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-purple-800 dark:text-purple-300">
            {idvDeepDiveData.workflow.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            {idvDeepDiveData.workflow.steps.map((step, index) => (
              <div
                key={index}
                className="relative rounded-xl border border-purple-200/50 bg-white/70 p-4 dark:border-purple-700/50 dark:bg-gray-800/70">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-800 dark:bg-purple-900/50 dark:text-purple-200">
                  {step.step}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white">{step.title}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{step.desc}</div>
                {index < idvDeepDiveData.workflow.steps.length - 1 && (
                  <div className="absolute top-1/2 right-0 hidden h-0.5 w-4 translate-x-full -translate-y-1/2 transform bg-purple-200 md:block dark:bg-purple-700" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Risk Mitigation */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-purple-800 dark:text-purple-300">
            {idvDeepDiveData.risks.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {idvDeepDiveData.risks.items.map((risk, index) => (
              <div
                key={index}
                className="rounded-xl border border-red-200/50 bg-red-50/50 p-4 dark:border-red-700/30 dark:bg-red-900/10">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{risk.icon}</span>
                  <span className="font-semibold text-red-800 dark:text-red-300">{risk.name}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{risk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet */}
        {idvDeepDiveData.codeSnippet && (
          <div className="overflow-hidden rounded-lg border border-gray-300/50 dark:border-gray-600/50">
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 dark:bg-gray-700">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                📄 {idvDeepDiveData.codeSnippet.title}
              </span>
              <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-600 dark:text-gray-400">
                {idvDeepDiveData.codeSnippet.language}
              </span>
            </div>
            <pre className="overflow-x-auto bg-gray-900 p-4 text-xs text-gray-100">
              <code>{idvDeepDiveData.codeSnippet.code}</code>
            </pre>
          </div>
        )}
      </section>

      {/* Quantified Technical Quality Grid */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-indigo-50 to-white p-8 dark:border-indigo-700/30 dark:from-indigo-900/20 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{qualityMetricsData.title}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {qualityMetricsData.items.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-indigo-200/50 bg-white/70 p-5 dark:border-indigo-700/50 dark:bg-gray-800/70">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="font-bold text-gray-900 dark:text-white">{item.label}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collection System Section */}
      <section className="rounded-2xl border-2 border-emerald-200/50 bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-8 dark:border-emerald-700/30 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{collectionSystemData.title}</h2>

        {/* Overview */}
        <div className="mb-8 rounded-xl border border-emerald-200/50 bg-white/70 p-6 dark:border-emerald-700/50 dark:bg-gray-800/70">
          <h3 className="mb-3 text-lg font-semibold text-emerald-800 dark:text-emerald-300">
            {collectionSystemData.overview.title}
          </h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">{collectionSystemData.overview.description}</p>
          <ul className="space-y-2">
            {collectionSystemData.overview.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                {renderBoldText(item)}
              </li>
            ))}
          </ul>
        </div>

        {/* Three-Layer Architecture Diagram */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-emerald-800 dark:text-emerald-300">
            {collectionSystemData.architecture.title}
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
            {collectionSystemData.architecture.layers.map((layer, index) => (
              <div key={index} className="flex flex-1 flex-col items-center">
                <div className="z-10 w-full rounded-xl border border-emerald-200 bg-white p-4 text-center shadow-sm dark:border-emerald-700 dark:bg-gray-800">
                  <div className="mb-1 text-xs font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                    {layer.role}
                  </div>
                  <div className="mb-1 text-lg font-bold text-gray-900 dark:text-white">{layer.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{layer.desc}</div>
                </div>
                {index < collectionSystemData.architecture.layers.length - 1 && (
                  <div className="my-2 text-2xl text-emerald-300 md:mx-2 md:my-auto md:rotate-[-90deg] dark:text-emerald-700">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Core Features Grid */}
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-emerald-800 dark:text-emerald-300">
            {collectionSystemData.features.title}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {collectionSystemData.features.items.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-emerald-200/50 bg-emerald-50/50 p-4 dark:border-emerald-700/30 dark:bg-emerald-900/10">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-2xl">{feature.icon}</span>
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">{feature.title}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{renderBoldText(feature.desc)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Snippet */}
        {collectionSystemData.codeSnippet && (
          <div className="overflow-hidden rounded-lg border border-gray-300/50 dark:border-gray-600/50">
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2 dark:bg-gray-700">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                📄 {collectionSystemData.codeSnippet.title}
              </span>
              <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-600 dark:text-gray-400">
                {collectionSystemData.codeSnippet.language}
              </span>
            </div>
            <pre className="overflow-x-auto bg-gray-900 p-4 text-xs text-gray-100">
              <code>{collectionSystemData.codeSnippet.code}</code>
            </pre>
          </div>
        )}
      </section>

      {/* Engineering Contribution Metrics */}
      <section className="rounded-2xl border border-gray-200/50 bg-gradient-to-br from-purple-50 to-white p-8 dark:border-purple-700/30 dark:from-purple-900/20 dark:to-gray-800/50">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{metricsData.title}</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {metricsData.items.map((item, index) => (
            <div key={index} className="text-center">
              <div className="mb-2 text-4xl font-bold text-purple-600 dark:text-purple-400">{item.value}</div>
              <div className="mb-1 font-semibold text-gray-900 dark:text-white">{item.label}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering Quality Showcases (with Code Snippets) */}
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

              <ul className="mb-4 grid gap-2 md:grid-cols-2">
                {challenge.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                    {renderBoldText(detail)}
                  </li>
                ))}
              </ul>

              {/* Code Snippet - Proof of Engineering */}
              {challenge.codeSnippet && (
                <div className="mt-4 overflow-hidden rounded-lg border border-gray-300/50 dark:border-gray-600/50">
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-2 dark:bg-gray-700">
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                      📄 {challenge.codeSnippet.title}
                    </span>
                    <span className="rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-600 dark:text-gray-400">
                      {challenge.codeSnippet.language}
                    </span>
                  </div>
                  <pre className="overflow-x-auto bg-gray-900 p-4 text-xs text-gray-100">
                    <code>{challenge.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>
          ))}
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
