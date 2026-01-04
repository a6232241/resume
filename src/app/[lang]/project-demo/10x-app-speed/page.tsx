import { getMediaUrl } from "@src/util";
import {
  DiagnosticProcess,
  EvidenceGallery,
  PerformanceHero,
  PerformanceOverview,
  SolutionEvaluation,
  TechnicalImplementation,
  TechnicalInsights,
} from "./components";

// Hero 數據
const heroData = {
  title: "10x App Speed: Performance Optimization",
  tagline: "登入流程 × 多頁面導航 × 狀態管理",
  description: (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:divide-x md:divide-gray-200 dark:md:divide-gray-700">
      <div className="space-y-2">
        <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">
          挑戰 (Challenge)
        </h3>
        <p className="text-gray-900 dark:text-gray-100">
          解決登入 <span className="font-bold text-blue-600 dark:text-blue-400">10s</span> 延遲與白屏卡頓。
        </p>
      </div>
      <div className="space-y-2 md:pl-8">
        <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">方案 (Solution)</h3>
        <p className="text-gray-900 dark:text-gray-100">重構 Redux 緩存機制並升級 RTK。</p>
      </div>
      <div className="space-y-2 md:pl-8">
        <h3 className="text-sm font-bold tracking-wider text-gray-500 uppercase dark:text-gray-400">成效 (Impact)</h3>
        <p className="text-gray-900 dark:text-gray-100">
          提速 <span className="font-bold text-blue-600 dark:text-blue-400">90%</span> (
          <span className="font-bold text-blue-600 dark:text-blue-400">10x</span>)，改善導航流暢度。
        </p>
      </div>
    </div>
  ),
};

// 概覽數據
const overviewData = {
  overview: {
    duration: "2 週",
    team: "獨立診斷與優化",
    projectType: "工作專案 · 性能優化",
    mainTechs: ["React Native", "Redux Toolkit", "React Query", "React DevTools", "Flipper"],
    focus: ["登入流程", "多頁面導航", "狀態管理"],
  },
  metrics: [
    {
      area: "登入流程",
      before: "10s",
      after: "1s",
      improvement: "10x",
      experienceDescription: "有效解決了原本用戶在登入後常見的白屏與操作卡頓感",
    },
    {
      area: "多頁面導航",
      before: "4s",
      after: "1s",
      improvement: "4x",
      experienceDescription: "顯著降低了 QA 階段的性能投訴率",
    },
  ],
};

// 診斷過程數據
const diagnosisData = {
  process: [
    {
      step: 1,
      title: "QA 反饋",
      icon: "📢",
      description: "App 性能瓶頸投訴",
      keyFinding: "QA 反饋登入後頁面卡頓超過 10 秒",
    },
    {
      step: 2,
      title: "API 檢測",
      icon: "🔍",
      tool: "Postman",
      keyFinding: "排除後端問題，確認瓶頸在前端",
    },
    {
      step: 3,
      title: "渲染分析",
      icon: "⚡",
      tool: "React DevTools",
      keyFinding: "發現登入後的重複重置導致全域 re-render",
    },
    {
      step: 4,
      title: "狀態檢查",
      icon: "🔴",
      tool: "Flipper",
      keyFinding: "定位到兩處重複調用 resetApiState 加重 re-render 的次數",
    },
  ],
  findings: [
    {
      id: 1,
      title: "跨頁面級聯重新渲染",
      icon: "🌊",
      symptom: "登入後所有使用 useQuery 的頁面受影響",
      metric: "無關頁面被渲染多次",
    },
    {
      id: 2,
      title: "重複執行 resetApiState",
      icon: "⚙️",
      symptom: "登入後執行兩次，加重渲染問題",
      locations: ["登入按鈕完成後", "Token 成功後"],
    },
    {
      id: 3,
      title: "selectFromResult 過度計算",
      icon: "🔄",
      symptom: "每次 store 變化都重新執行，缺乏記憶化",
      impact: "導致淺比較失敗，觸發不必要重新渲染",
    },
  ],
};

// 解決方案評估數據
const solutionsData = {
  title: "解決方案評估",
  approaches: [
    {
      id: 1,
      name: "修改 RTK Query 源代碼",
      difficulty: "🔴🔴🔴",
      risk: "🔴 高",
      maintainability: "低",
      decision: "❌",
      tradeoff: "成本過高，維護困難",
    },
    {
      id: 2,
      name: "全局啟用 Skip 邏輯",
      difficulty: "🟡🟡",
      risk: "🟡 中",
      maintainability: "中",
      decision: "⚠️",
      tradeoff: "每次切頁需手動刷新",
    },
    {
      id: 3,
      name: "CreateSelector 優化",
      difficulty: "🟡🟡",
      risk: "🟢 低",
      maintainability: "高",
      decision: "✅ 先選",
      reason: "安全的優化路線",
    },
    {
      id: 4,
      name: "升級 Redux Toolkit",
      difficulty: "🟡🟡",
      risk: "🟡 中",
      maintainability: "高",
      decision: "✅ 最終",
      result: "效果超出預期",
    },
  ],
};

// 技術實施數據
const implementationData = {
  phases: [
    {
      phase: 1,
      title: "登入流程狀態管理優化",
      duration: "2-3 天",
      steps: ["分析與驗證", "代碼分離並優化", "識別重複 resetApiState", "決定移除其中一個調用", "完整流程驗證測試"],
      result: "10s → 1s ✅",
      keyChange: {
        type: "移除重複調用",
        removed: "handleLogin() 中的 resetApiState()",
      },
    },
    {
      phase: 2,
      title: "多頁面導航性能優化",
      duration: "1-2 週",
      steps: [
        "RTK Query 源代碼分析",
        "識別 selectFromResult 過度計算",
        "評估 4 個解決方案",
        "實施 createSelector 優化",
        "升級 Redux Toolkit",
        "與 QA 協同測試",
      ],
      result: "4s → 1s ✅",
      keyChanges: [
        { change: "createSelector 優化", impact: "明確依賴追蹤" },
        { change: "Redux 升級", from: "1.9.7", to: "2.5.1", impact: "根本性能提升" },
      ],
    },
    {
      phase: 3,
      title: "訂閱同步問題修復",
      duration: "1 天",
      issue: "升級後數據獲取過快導致訂閱前被刪除",
      solution: "調整操作順序：導航前清理 vs 進入後清理",
      result: "數據完整性確保 ✅",
    },
  ],
};

// 證據數據
const evidenceData = {
  videos: [
    {
      id: 1,
      title: "登入流程優化 (前)",
      duration: "30秒",
      description: "登入流程優化前的實機畫面",
      performance: "10s+ 載入",
      fileUrl: getMediaUrl("/10x-app-speed/reset_state_api_before.mp4"),
      icon: "🎬",
      watchPoint: "注意時間 00:23 處，登入後頁面載入的白屏時間",
    },
    {
      id: 2,
      title: "登入流程優化 (後)",
      duration: "30秒",
      description: "登入流程優化後的實機畫面",
      performance: "< 1s 載入",
      fileUrl: getMediaUrl("/10x-app-speed/reset_state_api_after.mp4"),
      icon: "🎬",
      watchPoint: "注意時間 00:15 處，登入後頁面載入的白屏時間",
    },
    {
      id: 5,
      title: "多頁面導航 createSelector 優化 (前)",
      description: "添加 createSelector 前的實機畫面",
      fileUrl: getMediaUrl("/10x-app-speed/add_createSelector_before.mp4"),
      icon: "⚡",
      watchPoint: "注意導航切換後，頁面載入的白屏時間",
    },
    {
      id: 6,
      title: "多頁面導航 createSelector 優化 (後)",
      description: "添加 createSelector 後的實機畫面",
      fileUrl: getMediaUrl("/10x-app-speed/add_createSelector_after.mp4"),
      icon: "⚡",
      watchPoint: "注意導航切換後，頁面載入的白屏時間",
    },
    {
      id: 7,
      title: "多頁面導航 Redux Toolkit 升級 (前)",
      description: "Redux Toolkit 升級前的直播列表頁面導航",
      fileUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_before.MP4"),
      icon: "🔴",
      watchPoint: "注意每次導航切換後，頁面載入的白屏時間",
    },
    {
      id: 8,
      title: "多頁面導航 Redux Toolkit 升級 (後)",
      description: "Redux Toolkit 升級後的直播列表頁面導航",
      fileUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_after.MP4"),
      icon: "🟢",
      watchPoint: "注意每次導航切換後，頁面載入的白屏時間",
    },
    {
      id: 9,
      title: "聊天室訂閱同步問題修復 (前)",
      description: "數據丟失問題",
      fileUrl: getMediaUrl("/10x-app-speed/state_sync_fix_before.mp4"),
      icon: "🎬",
    },
    {
      id: 10,
      title: "聊天室訂閱同步問題修復 (後)",
      description: "數據完整性確保",
      result: "數據完整 ✅",
      fileUrl: getMediaUrl("/10x-app-speed/state_sync_fix_after.mp4"),
      icon: "🎬",
    },
  ],
  screenshots: [
    {
      id: 1,
      title: "定位重複 API 重置邏輯",
      type: "code",
      shows: "通過分析發現 handleLogin 與 Token 更新時重複調用 resetApiState，加重重複渲染問題",
      imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_annotated.png"),
      icon: "🎯",
    },
    {
      id: 2,
      title: "createSelector 記憶化重構",
      type: "code",
      shows: "將 selectFromResult 使用 createSelector 重構，確保僅在相關數據變更時才觸發組件重新渲染",
      imageUrl: getMediaUrl("/10x-app-speed/add_createSelector_annotated.png"),
      icon: "🔧",
    },
    {
      id: 3,
      title: "狀態同步時序修正",
      type: "code",
      shows: "修正導航與數據清理的執行順序，解決在高頻更新場景下的數據丟失問題",
      imageUrl: getMediaUrl("/10x-app-speed/state_sync_fix_annotated.png"),
      icon: "⏱️",
    },
    {
      id: 4,
      title: "登入流程火焰圖 (前)",
      type: "profiling",
      shows: "登入流程優化前的渲染火焰圖",
      imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_devtool_home_flamegraph_before.png"),
      icon: "🔥",
    },
    {
      id: 5,
      title: "登入流程火焰圖 (後)",
      type: "profiling",
      shows: "登入流程優化後的渲染火焰圖",
      imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_devtool_home_flamegraph_after.png"),
      icon: "🔥",
    },
    {
      id: 10,
      title: "登入流程 Flipper 狀態監控 (前)",
      type: "profiling",
      shows: "登入流程優化前的 Flipper 狀態變化",
      imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_flipper_before.png"),
      icon: "",
    },
    {
      id: 11,
      title: "登入流程 Flipper 狀態監控 (後)",
      type: "profiling",
      shows: "登入流程優化後的 Flipper 狀態變化",
      imageUrl: getMediaUrl("/10x-app-speed/reset_state_api_by_flipper_after.png"),
      icon: "",
    },
    {
      id: 6,
      title: "多頁面導航 createSelector 優化 (前）",
      type: "profiling",
      shows: "添加 createSelector 前的多頁面導航火焰圖",
      imageUrl: getMediaUrl("/10x-app-speed/add_createSelector_by_devtool_home_ranked_before.png"),
      icon: "🔥",
    },
    {
      id: 7,
      title: "多頁面導航 createSelector 優化 (後）",
      type: "profiling",
      shows: "添加 createSelector 後的多頁面導航火焰圖",
      imageUrl: getMediaUrl("/10x-app-speed/add_createSelector_by_devtool_home_ranked_after.png"),
      icon: "🔥",
    },
    {
      id: 8,
      title: "多頁面導航 Redux Toolkit 升級 (前）",
      type: "profiling",
      shows: "Redux Toolkit 升級前的多頁面導航火焰圖",
      imageUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_by_devtool_liveList_flamegraph_before.png"),
      icon: "🔥",
    },
    {
      id: 9,
      title: "多頁面導航 Redux Toolkit 升級 (後）",
      type: "profiling",
      shows: "Redux Toolkit 升級後的多頁面導航火焰圖",
      imageUrl: getMediaUrl("/10x-app-speed/update_reduxToolkit_by_devtool_liveList_flamegraph_after.png"),
      icon: "🔥",
    },
  ],
  references: [
    {
      title: "GitHub Issue #4028",
      description: "selectFromResult 過度重新渲染社區討論",
      url: "https://github.com/reduxjs/redux-toolkit/issues/4028",
      icon: "🔗",
    },
  ],
};

// 技術洞察數據
const insightsData = {
  insights: [
    {
      id: 1,
      title: "Redux 全局更新的級聯效應",
      icon: "🌊",
      collapsedSummary: "理解 store 變更引發全應用重新渲染的防禦機制",
      concept: "Redux store 任何改變都會通知所有訂閱者",
      impact: "導致全應用級的連鎖重新渲染",
      solution: "組件層加防護（React.memo、選擇器記憶化）",
      keyTakeaway: "架構設計決定性能上限",
    },
    {
      id: 2,
      title: "SelectFromResult 反模式",
      icon: "🔄",
      collapsedSummary: "解決緩存失效主因：缺乏記憶化導致的無效淺比較",
      concept: "沒有記憶化的選擇器在每次 store 變化都重新執行",
      impact: "缺乏依賴追蹤，導致過度重新渲染",
      solutions: ["createSelector", "useMemo", "Redux 新版本"],
      keyTakeaway: "依賴管理是性能優化的核心",
    },
    {
      id: 3,
      title: "狀態同步時序問題",
      icon: "⏱️",
      collapsedSummary: "掌握非同步操作順序對邏輯正確性的影響",
      concept: "非同步操作的順序決定了邏輯的正確性",
      impact: "升級依賴改變性能特性，暴露原有缺陷",
      lesson: "充分測試、明確操作順序",
      keyTakeaway: "優化與重構需要系統思維",
    },
    {
      id: 4,
      title: "系統化的性能診斷方法",
      icon: "🔍",
      collapsedSummary: "建立一套標準的排除 API、確認渲染、定位根因流程",
      methodology: "排除 API → 確認渲染 → 定位根因",
      tools: ["Postman", "React DevTools", "Flipper", "源代碼分析"],
      benefit: "快速定位複雜問題",
      keyTakeaway: "工具 and 方法論一樣重要",
    },
    {
      id: 5,
      title: "依賴升級的風險管理",
      icon: "⚠️",
      collapsedSummary: "平衡升級帶來的收益與潛在的性能特性變化風險",
      challenge: "升級有風險但不升級有遺憾",
      approach: "充分評估 → 謹慎嘗試 → 完整驗證",
      outcome: "通常能帶來超出預期的收益",
      keyTakeaway: "計算化風險管理推動進步",
    },
    {
      id: 6,
      title: "社區知識的價值",
      icon: "🤝",
      collapsedSummary: "利用 GitHub Issues 驗證方案，加速核心瓶頸定位",
      resource: "GitHub Issues 是快速獲取知識和驗證方案的途徑",
      example: "Issue #4028 驗證了性能問題的根本原因",
      practice: "積極參與、主動分享",
      keyTakeaway: "社區知識加速個人成長",
    },
  ],
};

export default function OptimizationLoadingSpeedPage() {
  return (
    <main className="container mx-auto max-w-6xl px-6 py-12">
      <PerformanceHero {...heroData} />
      <PerformanceOverview {...overviewData} />
      <DiagnosticProcess {...diagnosisData} />
      <SolutionEvaluation {...solutionsData} />
      <TechnicalImplementation {...implementationData} />
      <EvidenceGallery {...evidenceData} />
      <TechnicalInsights {...insightsData} />
    </main>
  );
}
