import {
  PerformanceHero,
  PerformanceOverview,
  DiagnosticProcess,
  SolutionEvaluation,
  TechnicalImplementation,
  EvidenceGallery,
  TechnicalInsights,
} from "./components";

// Hero 數據
const heroData = {
  title: "App 性能優化",
  tagline: "登入流程 × 多頁面導航 × 狀態管理",
};

// 概覽數據
const overviewData = {
  overview: {
    duration: "2 週",
    team: "獨立診斷與優化",
    projectType: "工作專案 · 性能優化",
    mainTechs: ["React DevTools", "Redux DevTools", "Flipper", "RTK Query", "Redux Toolkit"],
    focus: ["登入流程", "多頁面導航", "狀態管理"],
  },
  metrics: [
    {
      area: "登入返回",
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
      keyFinding: "發現登入後的重複重置導致全域 Re-render",
    },
    {
      step: 4,
      title: "狀態檢查",
      icon: "🔴",
      tool: "Flipper",
      keyFinding: "定位到兩處重複調用 resetApiState 導致緩存失效",
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
      symptom: "登入後執行兩次，導致緩存失效",
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
      reason: "成本過高，維護困難",
    },
    {
      id: 2,
      name: "全局啟用 Skip 邏輯",
      difficulty: "🟡🟡",
      risk: "🟡 中",
      maintainability: "中",
      decision: "⚠️",
      tradeoff: "每次切頁都重新刷新",
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
      fileUrl:
        "/work-experience/optimization-loading-speed/other_optimizations_and_removing_redundant_resetStateApi_before.mp4",
      icon: "🎬",
      watchPoint: "注意登入後頁面載入的白屏時間",
    },
    {
      id: 2,
      title: "登入流程優化 (後)",
      duration: "30秒",
      description: "登入流程優化後的實機畫面",
      performance: "< 1s 載入",
      fileUrl:
        "/work-experience/optimization-loading-speed/other_optimizations_and_removing_redundant_resetStateApi_after.mp4",
      icon: "🎬",
      watchPoint: "對比優化後的即時響應效果",
    },
    {
      id: 3,
      title: "登入流程優化 Flipper 狀態監控 (前)",
      description: "登入流程優化前的 Redux 狀態變化",
      fileUrl:
        "/work-experience/optimization-loading-speed/other_optimizations_and_removing_redundant_resetStateApi_by_flipper_before.mov",
      icon: "🔴",
    },
    {
      id: 4,
      title: "登入流程優化 Flipper 狀態監控 (後)",
      description: "登入流程優化後的 Redux 狀態變化",
      fileUrl:
        "/work-experience/optimization-loading-speed/other_optimizations_and_removing_redundant_resetStateApi_by_flipper_after.mov",
      icon: "🟢",
    },
    {
      id: 5,
      title: "多頁面導航 createSelector 優化 (前)",
      description: "添加 createSelector 前的實機畫面",
      fileUrl: "/work-experience/optimization-loading-speed/add_createSelector_before.mp4",
      icon: "⚡",
    },
    {
      id: 6,
      title: "多頁面導航 createSelector 優化 (後)",
      description: "添加 createSelector 後的實機畫面",
      fileUrl: "/work-experience/optimization-loading-speed/add_createSelector_after.mp4",
      icon: "⚡",
    },
    {
      id: 7,
      title: "多頁面導航 Redux Toolkit 升級 (前)",
      description: "Redux Toolkit 升級前的直播列表頁面導航",
      fileUrl: "/work-experience/optimization-loading-speed/update_reduxToolkit_before.MP4",
      icon: "🔴",
      watchPoint: "注意導航切換後的資料獲取速度",
    },
    {
      id: 8,
      title: "多頁面導航 Redux Toolkit 升級 (後)",
      description: "Redux Toolkit 升級後的直播列表頁面導航",
      fileUrl: "/work-experience/optimization-loading-speed/update_reduxToolkit_after.MP4",
      icon: "🟢",
      watchPoint: "對比優化後的速度差異",
    },
    {
      id: 9,
      title: "聊天室訂閱同步問題修復 (前)",
      description: "數據丟失問題",
      fileUrl: "/work-experience/optimization-loading-speed/message_remove_fix_before.mp4",
      icon: "🎬",
    },
    {
      id: 10,
      title: "聊天室訂閱同步問題修復 (後)",
      description: "數據完整性確保",
      result: "數據完整 ✅",
      fileUrl: "/work-experience/optimization-loading-speed/message_remove_fix_after.mp4",
      icon: "🎬",
    },
  ],
  screenshots: [
    {
      id: 1,
      title: "登入優化火焰圖 (前)",
      type: "profiling",
      shows: "登入流程優化前的渲染火焰圖",
      imageUrl:
        "/work-experience/optimization-loading-speed/other_optimizations_and_removing_redundant_resetStateApi_by_devtool_home_flamegraph_before.png",
      icon: "🔥",
    },
    {
      id: 2,
      title: "resetApiState 調用位置 1",
      type: "code",
      shows: "登入按鈕點擊後的調用",
      imageUrl: "/work-experience/optimization-loading-speed/resetStateApi_when_click_login_button.webp",
      icon: "📍",
    },
    {
      id: 3,
      title: "resetApiState 調用位置 2",
      type: "code",
      shows: "Token 更新時的調用",
      imageUrl: "/work-experience/optimization-loading-speed/resetStateApi_when_token_update.webp",
      icon: "📍",
    },
    {
      id: 4,
      title: "登入優化火焰圖 (後)",
      type: "profiling",
      shows: "登入流程優化後的渲染火焰圖",
      imageUrl:
        "/work-experience/optimization-loading-speed/other_optimizations_and_removing_redundant_resetStateApi_by_devtool_home_flamegraph_after.png",
      icon: "🔥",
    },
    {
      id: 5,
      title: "多頁面導航 createSelector 優化 (前)",
      type: "profiling",
      shows: "添加 createSelector 前",
      imageUrl: "/work-experience/optimization-loading-speed/add_createSelector_by_devtool_home_ranked_before.png",
      icon: "⚡",
    },
    {
      id: 6,
      title: "多頁面導航 createSelector 修復代碼",
      type: "code",
      shows: "selectFromResult 使用 createSelector 包覆",
      imageUrl: "/work-experience/optimization-loading-speed/add_createSelector_fix.png",
      icon: "🔧",
    },
    {
      id: 7,
      title: "多頁面導航 createSelector 優化 (後)",
      type: "profiling",
      shows: "添加 createSelector 後",
      imageUrl: "/work-experience/optimization-loading-speed/add_createSelector_by_devtool_home_ranked_after.png",
      icon: "⚡",
    },
    {
      id: 8,
      title: "多頁面導航 RTK 升級火焰圖 (前)",
      type: "profiling",
      shows: "RTK 升級前的直播列表火焰圖",
      imageUrl:
        "/work-experience/optimization-loading-speed/update_reduxToolkit_by_devtool_liveList_flamegraph_before.png",
      icon: "🔥",
    },
    {
      id: 9,
      title: "多頁面導航 RTK 升級火焰圖 (後)",
      type: "profiling",
      shows: "RTK 升級後的直播列表火焰圖",
      imageUrl:
        "/work-experience/optimization-loading-speed/update_reduxToolkit_by_devtool_liveList_flamegraph_after.png",
      icon: "🔥",
    },
    {
      id: 10,
      title: "聊天室資料清除原因",
      type: "code",
      shows: "造成問題的清理邏輯",
      imageUrl: "/work-experience/optimization-loading-speed/message_remove_reason.webp",
      icon: "🔍",
    },
    {
      id: 11,
      title: "訊息移除時序 Log",
      type: "log",
      shows: "時序問題的 Log 紀錄",
      imageUrl: "/work-experience/optimization-loading-speed/message_remove_log.webp",
      icon: "📊",
    },
    {
      id: 12,
      title: "聊天室資料清除 修正代碼",
      type: "code",
      shows: "修正代碼",
      imageUrl: "/work-experience/optimization-loading-speed/message_remove_fix.png",
      icon: "🔧",
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
      concept: "Redux store 任何改變都會通知所有訂閱者",
      impact: "導致全應用級的連鎖重新渲染",
      solution: "組件層加防護（React.memo、選擇器記憶化）",
      keyTakeaway: "架構設計決定性能上限",
    },
    {
      id: 2,
      title: "SelectFromResult 反模式",
      icon: "🔄",
      concept: "沒有記憶化的選擇器在每次 store 變化都重新執行",
      impact: "缺乏依賴追蹤，導致過度重新渲染",
      solutions: ["createSelector", "useMemo", "Redux 新版本"],
      keyTakeaway: "依賴管理是性能優化的核心",
    },
    {
      id: 3,
      title: "狀態同步時序問題",
      icon: "⏱️",
      concept: "非同步操作的順序決定了邏輯的正確性",
      impact: "升級依賴改變性能特性，暴露原有缺陷",
      lesson: "充分測試、明確操作順序",
      keyTakeaway: "優化與重構需要系統思維",
    },
    {
      id: 4,
      title: "系統化的性能診斷方法",
      icon: "🔍",
      methodology: "排除 API → 確認渲染 → 定位根因",
      tools: ["Postman", "React DevTools", "Flipper", "源代碼分析"],
      benefit: "快速定位複雜問題",
      keyTakeaway: "工具和方法論一樣重要",
    },
    {
      id: 5,
      title: "依賴升級的風險管理",
      icon: "⚠️",
      challenge: "升級有風險但不升級有遺憾",
      approach: "充分評估 → 謹慎嘗試 → 完整驗證",
      outcome: "通常能帶來超出預期的收益",
      keyTakeaway: "計算化風險管理推動進步",
    },
    {
      id: 6,
      title: "社區知識的價值",
      icon: "🤝",
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
