import {
  DiagnosticProcess,
  EvidenceGallery,
  PerformanceMetric,
  ProjectHero,
  ProjectOverview,
  SolutionEvaluation,
  TechnicalImplementation,
  TechnicalInsights,
} from "@features/portfolio/components";
import { getMediaUrl } from "@src/util";
import { getTranslations } from "next-intl/server";

export default async function tenXAppSpeedPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: "projects.10xAppSpeed.detail" });

  // --- Hero 數據重組 ---
  // JSX 結構保留在組件內，只替換文字
  const heroData = {
    title: t("hero.title"),
    tagline: t("hero.tagline"),
    description: (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
        <div className="space-y-2">
          <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("hero.challenge.title")}
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {t.rich("hero.challenge.desc", {
              highlight: (chunks) => <span className="font-bold text-blue-600 dark:text-blue-400">{chunks}</span>,
            })}
          </p>
        </div>
        <div className="space-y-2 md:pl-8">
          <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("hero.solution.title")}
          </h3>
          <p className="text-gray-900 dark:text-gray-100">{t("hero.solution.desc")}</p>
        </div>
        <div className="space-y-2 md:pl-8">
          <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {t("hero.impact.title")}
          </h3>
          <p className="text-gray-900 dark:text-gray-100">
            {t.rich("hero.impact.desc", {
              highlight: (chunks) => <span className="font-bold text-blue-600 dark:text-blue-400">{chunks}</span>,
            })}
          </p>
        </div>
      </div>
    ),
  };

  // --- 概覽數據重組 ---
  const overviewData = {
    overview: {
      duration: t("overview.duration"),
      team: t("overview.team"),
      projectType: t("overview.projectType"),
      mainTechs: t("overview.mainTechs").split(", "), // JSON 中存字串，這裡轉回陣列
      focus: t.raw("overview.focus") as string[],
      platforms: t.raw("overview.platforms") as string[],
    },
  };

  // --- 指標數據重組 ---
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

  // --- 診斷過程數據重組 ---
  // 保留 Icon 和 Step 的邏輯
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

  // --- 解決方案評估數據重組 ---
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

  // --- 技術實施數據重組 ---
  const implementationData = {
    phases: [
      {
        phase: 1,
        title: t("implementation.phases.p1.title"),
        duration: t("implementation.phases.p1.duration"),
        steps: t("implementation.phases.p1.steps").split(","),
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
        steps: t("implementation.phases.p2.steps").split(","),
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

  // --- 證據數據重組 ---
  // 定義靜態資源 Map (檔案路徑與 ID 的對應)
  const evidenceData = {
    videos: [
      {
        id: 1,
        title: t("evidence.videos.v1.title"),
        duration: "30秒",
        description: t("evidence.videos.v1.desc"),
        performance: "10s+ 載入",
        fileUrl: getMediaUrl("/10x-app-speed/reset_state_api_before.mp4"),
        icon: "🎬",
        watchPoint: t("evidence.videos.v1.watch"),
      },
      {
        id: 2,
        title: t("evidence.videos.v2.title"),
        duration: "30秒",
        description: t("evidence.videos.v2.desc"),
        performance: "< 1s 載入",
        fileUrl: getMediaUrl("/10x-app-speed/reset_state_api_after.mp4"),
        icon: "🎬",
        watchPoint: t("evidence.videos.v2.watch"),
      },
      // ... 依此類推，對應 JSON 中的 Key
      {
        id: 5,
        title: t("evidence.videos.v5.title"),
        description: t("evidence.videos.v5.desc"),
        fileUrl: getMediaUrl("/10x-app-speed/add_createSelector_before.mp4"),
        icon: "⚡",
        watchPoint: t("evidence.videos.v5.watch"),
      },
      {
        id: 6,
        title: t("evidence.videos.v6.title"),
        description: t("evidence.videos.v6.desc"),
        fileUrl: getMediaUrl("/10x-app-speed/add_createSelector_after.mp4"),
        icon: "⚡",
        watchPoint: t("evidence.videos.v6.watch"),
      },
      {
        id: 7,
        title: t("evidence.videos.v7.title"),
        description: t("evidence.videos.v7.desc"),
        fileUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_before.MP4"),
        icon: "🔴",
        watchPoint: t("evidence.videos.v7.watch"),
      },
      {
        id: 8,
        title: t("evidence.videos.v8.title"),
        description: t("evidence.videos.v8.desc"),
        fileUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_after.MP4"),
        icon: "🟢",
        watchPoint: t("evidence.videos.v8.watch"),
      },
      {
        id: 9,
        title: t("evidence.videos.v9.title"),
        description: t("evidence.videos.v9.desc"),
        fileUrl: getMediaUrl("/10x-app-speed/state_sync_fix_before.mp4"),
        icon: "🎬",
      },
      {
        id: 10,
        title: t("evidence.videos.v10.title"),
        description: t("evidence.videos.v10.desc"),
        result: t("evidence.videos.v10.result"),
        fileUrl: getMediaUrl("/10x-app-speed/state_sync_fix_after.mp4"),
        icon: "🎬",
      },
    ],
    screenshots: [
      {
        id: 1,
        title: t("evidence.screenshots.s1.title"),
        type: "code",
        shows: t("evidence.screenshots.s1.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_annotated.png"),
        icon: "🎯",
      },
      // ... 簡化起見，中間省略，模式同上 ...
      {
        id: 2,
        title: t("evidence.screenshots.s2.title"),
        type: "code",
        shows: t("evidence.screenshots.s2.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/add_createSelector_annotated.png"),
        icon: "🔧",
      },
      {
        id: 3,
        title: t("evidence.screenshots.s3.title"),
        type: "code",
        shows: t("evidence.screenshots.s3.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/state_sync_fix_annotated.png"),
        icon: "⏱️",
      },
      {
        id: 4,
        title: t("evidence.screenshots.s4.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s4.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_devtool_home_flamegraph_before.png"),
        icon: "🔥",
      },
      {
        id: 5,
        title: t("evidence.screenshots.s5.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s5.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_devtool_home_flamegraph_after.png"),
        icon: "🔥",
      },
      {
        id: 10,
        title: t("evidence.screenshots.s10.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s10.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_flipper_before.png"),
        icon: "",
      },
      {
        id: 11,
        title: t("evidence.screenshots.s11.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s11.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_flipper_after.png"),
        icon: "",
      },
      {
        id: 6,
        title: t("evidence.screenshots.s6.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s6.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/add_createSelector_by_devtool_home_ranked_before.png"),
        icon: "🔥",
      },
      {
        id: 7,
        title: t("evidence.screenshots.s7.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s7.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/add_createSelector_by_devtool_home_ranked_after.png"),
        icon: "🔥",
      },
      {
        id: 8,
        title: t("evidence.screenshots.s8.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s8.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_by_devtool_liveList_flamegraph_before.png"),
        icon: "🔥",
      },
      {
        id: 9,
        title: t("evidence.screenshots.s9.title"),
        type: "profiling",
        shows: t("evidence.screenshots.s9.shows"),
        imageUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_by_devtool_liveList_flamegraph_after.png"),
        icon: "🔥",
      },
    ],
    references: [
      {
        title: "GitHub Issue #4028",
        description: t("evidence.references.r1.desc"),
        url: "https://github.com/reduxjs/redux-toolkit/issues/4028",
        icon: "🔗",
      },
    ],
  };

  // --- 技術洞察數據重組 ---
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
      <ProjectHero {...heroData} gradientClass="from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400" />
      <ProjectOverview {...overviewData} techBadgeColor="blue" focusBadgeColor="purple" />
      <PerformanceMetric {...metricsData} />
      <DiagnosticProcess {...diagnosisData} />
      <SolutionEvaluation {...solutionsData} />
      <TechnicalImplementation {...implementationData} />
      <EvidenceGallery {...evidenceData} />
      <TechnicalInsights {...insightsData} />
    </main>
  );
}
