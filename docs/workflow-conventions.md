# Workflow Conventions

本專案的 i18n、靜態資源與 Git 工作流規範。

## i18n Conventions

本專案執行嚴格國際化規範，禁止任何形式的字串硬編碼。所有翻譯檔案存放於 `public/locales/` 目錄下。

### 翻譯檔案結構

本專案使用 `next-intl`，翻譯檔案結構如下：

- **主語系**：`public/locales/zh/index.json`
- **次語系**：`public/locales/en/index.json`

```
public/locales/
├── en/
│   ├── index.json              # 通用翻譯（導航、通用文字）
│   └── projects/
│       ├── _common.json        # 專案共用翻譯
│       ├── 10xAppSpeed.json    # 特定專案描述
│       ├── aiChatApp.json
│       ├── berify.json
│       ├── musicPlayer.json
│       └── visualStreaming.json
│
└── zh/
    ├── index.json
    └── projects/
        ├── _common.json
        ├── 10xAppSpeed.json
        ├── aiChatApp.json
        ├── berify.json
        ├── musicPlayer.json
        └── visualStreaming.json
```

### 嚴格作業流程

1. **先定義後使用**：若需要新語系鍵值，必須先將其加入 `public/locales/zh/` 與 `en/` 對應檔案，之後才在組件中使用。
2. **禁止硬編碼**：嚴禁在組件中硬編碼顯示給使用者的文字。
3. **同步更新**：新增翻譯時，**必須同時更新 `en/` 和 `zh/` 目錄下的對應檔案**。

### 函式庫用法

- **用戶端組件**：使用 `useTranslations`。
- **伺服器端組件**：使用 `getTranslations`。

```typescript
// ✅ Good - 使用 t() 取得翻譯
import { useTranslations } from 'next-intl';

const t = useTranslations('hero');
const title = t('title');
```

---

## Static Assets Conventions

所有靜態資源存放於 `public/` 目錄下。

### 目錄結構

```
public/
├── locales/                     # 翻譯檔案（見 i18n Conventions）
├── side-projects/               # 個人專案資源
│   ├── ai-chat-app/
│   │   ├── launch_screen-dark_theme.png
│   │   └── send_message-dark_theme.mp4
│   └── music-player/
│       ├── home_screen-dark_theme.png
│       └── filter_music.mp4
│
├── work-projects/               # 工作專案資源
│   ├── berify/
│   │   ├── home_screen.png
│   │   └── preview.png
│   └── visual-streaming/
│       ├── demo_00.png
│       └── demo_android_00.mp4
│
├── avatar.jpg                   # 全局資源
├── favicon.ico
└── *.svg                        # 圖標資源
```

### 命名規範

> [!IMPORTANT]
> **新建立的資源檔案必須使用 `kebab-case` 命名。**

```bash
# ✅ Good
home-screen-dark-theme.png
filter-music-demo.mp4
product-detail-screen.png

# ❌ Bad
homeScreen-darkTheme.png      # 使用了 camelCase
Filter_Music.mp4              # 使用了 snake_case 和大寫
ProductDetailScreen.png       # 使用了 PascalCase
```

### ⚠️ 現有資源凍結聲明

> [!CAUTION]
> **請勿更改現有的檔案名稱！**
>
> 專案計畫將資源遷移至外部檔案資料庫（Storage），隨意更改檔名會導致：
> - 現有引用路徑失效
> - 國際化 JSON 中的路徑需要同步更新
> - 版本控制歷史難以追蹤
>
> 如需重新命名，請在遷移計畫中統一處理。

### 資源分類原則

| 目錄 | 用途 | 範例 |
|------|------|------|
| `side-projects/{project}/` | 個人專案截圖與影片 | AI Chat App、Music Player |
| `work-projects/{project}/` | 工作專案截圖與影片 | Berify、Visual Streaming |
| 根目錄 | 全局共用資源 | avatar、favicon、SVG 圖標 |

---

## Git Workflow

### 分支命名規範

```bash
# 功能分支
git checkout -b feature/component-name
git checkout -b feature/add-lightbox

# 修復分支
git checkout -b fix/button-styling

# 文檔分支
git checkout -b docs/update-contributing

# 測試分支
git checkout -b test/add-component-tests
```

### 提交信息規範

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範，並視情況添加平台範疇。

#### 格式與範疇
- **前綴**：`feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `test:`。
- **範疇 (Scope)**：標題保持在 50 字元內。涉及特定平台時請加前綴（如 `android`, `ios`）。

#### 範例

```bash
# ✅ 功能與修復
git commit -m "feat: add Result Pattern support with safe util"
git commit -m "fix(android): resolve layout shift on splash screen"
git commit -m "feat(ios): implement native haptic feedback"

# ✅ 重構與文檔
git commit -m "refactor: migrate app components to features/portfolio"
git commit -m "docs: update contributing rules for result pattern"
```

### 創建 Pull Request

1. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **PR 標題**
   ```
   feat: Add LightBox component
   fix: Resolve Button styling issue
   ```

3. **PR 描述模板**
   ```markdown
   ## Description
   簡要描述這個 PR 的目的

   ## Changes
   - 更改 1
   - 更改 2

   ## Testing
   - [ ] 已在本地測試
   - [ ] 添加了單元測試

   ## Related Issues
   Closes #123
   ```
