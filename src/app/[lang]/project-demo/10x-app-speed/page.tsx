import {
  DiagnosticProcess,
  PerformanceMetric,
  ProjectHero,
  ProjectOverview,
  SolutionEvaluation,
  TabbedGallery,
  TechnicalImplementation,
  TechnicalInsights,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

interface ReferenceItem {
  title: string;
  desc: string;
  url: string;
}

export default async function tenXAppSpeedPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "projects.10xAppSpeed.detail" });

  // --- Hero Data ---
  const heroData = {
    title: t("hero.title"),
    tagline: t("hero.tagline"),
    summary: {
      problem: {
        icon: "🎯",
        title: t("hero.summary.problem.title"),
        desc: t.rich("hero.summary.problem.desc", {
          highlight: (chunks) => <span className="font-bold text-blue-600 dark:text-blue-400">{chunks}</span>,
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
          highlight: (chunks) => <span className="font-bold text-blue-600 dark:text-blue-400">{chunks}</span>,
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
      mainTechs: t.raw("overview.mainTechs") as string[],
      focus: t.raw("overview.focus") as string[],
      platforms: t.raw("overview.platforms") as string[],
    },
  };

  // --- Metrics Data ---
  const metricsData = {
    metrics: [
      {
        area: t("metrics.login.area"),
        before: "10s",
        after: "1s",
        improvement: "10x",
        experienceDescription: t("metrics.login.exp"),
      },
      {
        area: t("metrics.nav.area"),
        before: "4s",
        after: "1s",
        improvement: "4x",
        experienceDescription: t("metrics.nav.exp"),
      },
    ],
  };

  // --- Diagnosis Data ---
  const diagnosisData = {
    process: [
      {
        step: 1,
        title: t("diagnosis.steps.qa.title"),
        icon: "📢",
        description: t("diagnosis.steps.qa.desc"),
        keyFinding: t("diagnosis.steps.qa.finding"),
      },
      {
        step: 2,
        title: t("diagnosis.steps.api.title"),
        icon: "🔍",
        tool: "Postman",
        keyFinding: t("diagnosis.steps.api.finding"),
      },
      {
        step: 3,
        title: t("diagnosis.steps.render.title"),
        icon: "⚡",
        tool: "React DevTools",
        keyFinding: t("diagnosis.steps.render.finding"),
      },
      {
        step: 4,
        title: t("diagnosis.steps.state.title"),
        icon: "🔴",
        tool: "Flipper",
        keyFinding: t("diagnosis.steps.state.finding"),
      },
    ],
    findings: [
      {
        id: 1,
        title: t("diagnosis.findings.cascade.title"),
        icon: "🌊",
        symptom: t("diagnosis.findings.cascade.symptom"),
        metric: t("diagnosis.findings.cascade.metric"),
      },
      {
        id: 2,
        title: t("diagnosis.findings.reset.title"),
        icon: "⚙️",
        symptom: t("diagnosis.findings.reset.symptom"),
        locations: [t("diagnosis.findings.reset.loc1"), t("diagnosis.findings.reset.loc2")],
      },
      {
        id: 3,
        title: t("diagnosis.findings.select.title"),
        icon: "🔄",
        symptom: t("diagnosis.findings.select.symptom"),
        impact: t("diagnosis.findings.select.impact"),
      },
    ],
  };

  // --- Solutions Data ---
  const solutionsData = {
    title: t("solutions.title"),
    approaches: [
      {
        id: 1,
        name: t("solutions.approaches.source.name"),
        difficulty: "🔴🔴🔴",
        risk: t("solutions.approaches.source.risk"),
        maintainability: t("solutions.approaches.source.maintainability"),
        decision: "❌",
        tradeoff: t("solutions.approaches.source.tradeoff"),
      },
      {
        id: 2,
        name: t("solutions.approaches.skip.name"),
        difficulty: "🟡🟡",
        risk: t("solutions.approaches.skip.risk"),
        maintainability: t("solutions.approaches.skip.maintainability"),
        decision: "⚠️",
        tradeoff: t("solutions.approaches.skip.tradeoff"),
      },
      {
        id: 3,
        name: t("solutions.approaches.selector.name"),
        difficulty: "🟡🟡",
        risk: t("solutions.approaches.selector.risk"),
        maintainability: t("solutions.approaches.selector.maintainability"),
        decision: t("solutions.approaches.selector.decision"),
        reason: t("solutions.approaches.selector.reason"),
      },
      {
        id: 4,
        name: t("solutions.approaches.upgrade.name"),
        difficulty: "🟡🟡",
        risk: t("solutions.approaches.upgrade.risk"),
        maintainability: t("solutions.approaches.upgrade.maintainability"),
        decision: t("solutions.approaches.upgrade.decision"),
        result: t("solutions.approaches.upgrade.result"),
      },
    ],
  };

  // --- Implementation Data ---
  const implementationData = {
    phases: [
      {
        phase: 1,
        title: t("implementation.phases.p1.title"),
        duration: t("implementation.phases.p1.duration"),
        steps: t.raw("implementation.phases.p1.steps"),
        result: "10s → 1s ✅",
        keyChange: {
          type: t("implementation.phases.p1.keyChangeType"),
          removed: t("implementation.phases.p1.keyChangeRemoved"),
        },
      },
      {
        phase: 2,
        title: t("implementation.phases.p2.title"),
        duration: t("implementation.phases.p2.duration"),
        steps: t.raw("implementation.phases.p2.steps"),
        result: "4s → 1s ✅",
        keyChanges: [
          {
            change: t("implementation.phases.p2.change1"),
            impact: t("implementation.phases.p2.impact1"),
          },
          {
            change: t("implementation.phases.p2.change2"),
            from: "1.9.7",
            to: "2.5.1",
            impact: t("implementation.phases.p2.impact2"),
          },
        ],
      },
      {
        phase: 3,
        title: t("implementation.phases.p3.title"),
        duration: t("implementation.phases.p3.duration"),
        issue: t("implementation.phases.p3.issue"),
        solution: t("implementation.phases.p3.solution"),
        result: t("implementation.phases.p3.result"),
      },
    ],
  };

  // --- Gallery Data (Tabbed) ---
  const galleryRaw = t.raw("gallery") as {
    title: string;
    tabs: { login: string; navigation: string; sync: string };
    login: Record<string, { title: string; desc: string; comment?: string }>;
    navigation: Record<string, { title: string; desc: string; comment?: string }>;
    sync: Record<string, { title: string; desc: string; comment?: string }>;
  };

  const loginItems = [
    {
      key: "videoBefore",
      file: "reset_state_api_before.mp4",
      type: "video" as const,
      status: "Before (10s+)",
    },
    {
      key: "videoAfter",
      file: "reset_state_api_after.mp4",
      type: "video" as const,
      status: "After (~1s)",
    },
    {
      key: "flamegraphBefore",
      file: "reset_state_api_by_devtool_home_flamegraph_before.png",
      type: "image" as const,
      status: "Before",
    },
    {
      key: "flamegraphAfter",
      file: "reset_state_api_by_devtool_home_flamegraph_after.png",
      type: "image" as const,
      status: "After",
    },
    {
      key: "flipperBefore",
      file: "reset_state_api_by_flipper_before.png",
      type: "image" as const,
      status: "Before",
    },
    {
      key: "flipperAfter",
      file: "reset_state_api_by_flipper_after.png",
      type: "image" as const,
      status: "After",
    },
    {
      key: "codeLogic",
      file: "reset_state_api_annotated.png",
      type: "image" as const,
    },
  ].map((item) => ({
    type: item.type,
    src: getMediaUrl(`/10x-app-speed/${item.file}`),
    alt: galleryRaw.login[item.key]?.title || item.key,
    title: galleryRaw.login[item.key]?.title,
    description: galleryRaw.login[item.key]?.desc,
    status: item.status,
    comment: galleryRaw.login[item.key]?.comment,
  }));

  const navigationItems = [
    {
      key: "selectorVideoBefore",
      file: "add_createSelector_before.mp4",
      type: "video" as const,
      status: "Before (Laggy)",
    },
    {
      key: "selectorVideoAfter",
      file: "add_createSelector_after.mp4",
      type: "video" as const,
      status: "After (Smooth)",
    },
    {
      key: "rtkVideoBefore",
      file: "update_reduxToolkit_before.MP4",
      type: "video" as const,
      status: "Before (1.9.7)",
    },
    {
      key: "rtkVideoAfter",
      file: "update_reduxToolkit_after.MP4",
      type: "video" as const,
      status: "After (2.5.1)",
    },
    {
      key: "selectorRankedBefore",
      file: "add_createSelector_by_devtool_home_ranked_before.png",
      type: "image" as const,
      status: "Before",
    },
    {
      key: "selectorRankedAfter",
      file: "add_createSelector_by_devtool_home_ranked_after.png",
      type: "image" as const,
      status: "After",
    },
    {
      key: "rtkFlamegraphBefore",
      file: "update_reduxToolkit_by_devtool_liveList_flamegraph_before.png",
      type: "image" as const,
      status: "Before",
    },
    {
      key: "rtkFlamegraphAfter",
      file: "update_reduxToolkit_by_devtool_liveList_flamegraph_after.png",
      type: "image" as const,
      status: "After",
    },
    {
      key: "selectorCode",
      file: "add_createSelector_annotated.png",
      type: "image" as const,
    },
  ].map((item) => ({
    type: item.type,
    src: getMediaUrl(`/10x-app-speed/${item.file}`),
    alt: galleryRaw.navigation[item.key]?.title || item.key,
    title: galleryRaw.navigation[item.key]?.title,
    description: galleryRaw.navigation[item.key]?.desc,
    status: item.status,
    comment: galleryRaw.navigation[item.key]?.comment,
  }));

  const syncItems = [
    {
      key: "videoIssue",
      file: "state_sync_fix_before.mp4",
      type: "video" as const,
      status: "Before",
    },
    {
      key: "videoFixed",
      file: "state_sync_fix_after.mp4",
      type: "video" as const,
      status: "After",
    },
    {
      key: "codeLogic",
      file: "state_sync_fix_annotated.png",
      type: "image" as const,
    },
  ].map((item) => ({
    type: item.type,
    src: getMediaUrl(`/10x-app-speed/${item.file}`),
    alt: galleryRaw.sync[item.key]?.title || item.key,
    title: galleryRaw.sync[item.key]?.title,
    description: galleryRaw.sync[item.key]?.desc,
    status: item.status,
    comment: galleryRaw.sync[item.key]?.comment,
  }));

  const galleryTabs = [
    { label: galleryRaw.tabs.login, items: loginItems },
    { label: galleryRaw.tabs.navigation, items: navigationItems },
    { label: galleryRaw.tabs.sync, items: syncItems },
  ];

  // --- References Data ---
  const references = t.raw("references") as ReferenceItem[];

  // --- Insights Data ---
  const insightsData = {
    insights: [
      {
        id: 1,
        title: t("insights.i1.title"),
        icon: "🌊",
        collapsedSummary: t("insights.i1.summary"),
        concept: t("insights.i1.concept"),
        impact: t("insights.i1.impact"),
        solution: t("insights.i1.solution"),
        keyTakeaway: t("insights.i1.key"),
      },
      {
        id: 2,
        title: t("insights.i2.title"),
        icon: "🔄",
        collapsedSummary: t("insights.i2.summary"),
        concept: t("insights.i2.concept"),
        impact: t("insights.i2.impact"),
        solutions: ["createSelector", "useMemo", "Redux 新版本"], // 這裡也可以進一步拆分，目前保持簡單
        keyTakeaway: t("insights.i2.key"),
      },
      {
        id: 3,
        title: t("insights.i3.title"),
        icon: "⏱️",
        collapsedSummary: t("insights.i3.summary"),
        concept: t("insights.i3.concept"),
        impact: t("insights.i3.impact"),
        lesson: t("insights.i3.lesson"),
        keyTakeaway: t("insights.i3.key"),
      },
      {
        id: 4,
        title: t("insights.i4.title"),
        icon: "🔍",
        collapsedSummary: t("insights.i4.summary"),
        methodology: t("insights.i4.methodology"),
        tools: ["Postman", "React DevTools", "Flipper", "源代碼分析"],
        benefit: t("insights.i4.benefit"),
        keyTakeaway: t("insights.i4.key"),
      },
      {
        id: 5,
        title: t("insights.i5.title"),
        icon: "⚠️",
        collapsedSummary: t("insights.i5.summary"),
        challenge: t("insights.i5.challenge"),
        approach: t("insights.i5.approach"),
        outcome: t("insights.i5.outcome"),
        keyTakeaway: t("insights.i5.key"),
      },
      {
        id: 6,
        title: t("insights.i6.title"),
        icon: "🤝",
        collapsedSummary: t("insights.i6.summary"),
        resource: t("insights.i6.resource"),
        example: t("insights.i6.example"),
        practice: t("insights.i6.practice"),
        keyTakeaway: t("insights.i6.key"),
      },
    ],
  };

  return (
    <main className="container mx-auto flex max-w-6xl flex-col gap-12 px-6 py-12">
      <ProjectHero
        {...heroData}
        gradientClass="from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        borderGradientClass="from-blue-600/20 via-blue-600/20 to-purple-600/20"
      />
      <ProjectOverview {...overviewData} techBadgeColor="blue" />
      <PerformanceMetric {...metricsData} />
      <DiagnosticProcess {...diagnosisData} />
      <SolutionEvaluation {...solutionsData} />
      <TechnicalImplementation {...implementationData} />
      <TabbedGallery tabs={galleryTabs} title={galleryRaw.title} />

      {/* 相關資源 */}
      <section className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg backdrop-blur-sm dark:from-blue-900/20 dark:to-indigo-900/20">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">🔗 相關資源</h3>
        <div className="flex flex-wrap gap-4">
          {references.map((ref: ReferenceItem) => (
            <a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-3 text-gray-700 shadow transition-shadow hover:shadow-md dark:bg-gray-800 dark:text-gray-300">
              <div>
                <p className="font-medium">{ref.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{ref.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      <TechnicalInsights {...insightsData} />
    </main>
  );
}
