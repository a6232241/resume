# Contributing to Resume

感謝你對本專案的貢獻！本文檔將指導你如何參與開發、遵循專案的程式碼規格和文件結構。

## Table of Contents

- [Setup](#setup)
- [Development Environment](#development-environment)
- [Project Structure](#project-structure)
- [Code Style & Conventions](#code-style--conventions)
- [Context Organization](#context-organization)
- [Component Development Guide](#component-development-guide)
- [Export & Import Patterns](#export--import-patterns)
- [Git Workflow](#git-workflow)
- [Running Tests](#running-tests)

---

## Setup

### 1. Clone the Repository

```bash
git clone git@github.com:a6232241/resume.git
cd resume
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

伺服器將在 `http://localhost:3000` 啟動（或其他指定連接埠）

---

## Development Environment

### 必需工具

- **Node.js** >= 18.18.0
- **npm** >= 10.7.0
- **Git** >= 2.40.0

### 推薦工具

#### VSCode 擴展

將以下擴展添加到 `.vscode/extensions.json`：

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "streetsidesoftware.code-spell-checker",
    "mhutchie.git-graph",
    "eamodio.gitlens",
    "Gruntfuggly.todo-tree"
  ]
}
```

#### 開發工具

- **ESLint** - 程式碼品質檢查
- **Prettier** - 代碼格式化
- **TypeScript** - 類型檢查
- **Tailwind CSS** - 樣式框架

### VSCode Settings 推薦

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## Project Structure

本專案採用 **Feature-First + Category Grouping** 的組織方式：

```
src/
├── components/                  # 共享組件
│   ├── ui/                      # 純 UI 組件庫（展示組件）
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   ├── LightBox/
│   │   │   ├── LightBox.tsx
│   │   │   ├── LightBox.test.tsx
│   │   │   ├── LightBox.types.ts
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   ├── Card/
│   │   └── index.ts             # Barrel export
│   │
│   ├── shared/                  # 容器組件（有邏輯、有 hooks）
│   │   ├── ThemeToggle/
│   │   │   ├── ThemeToggle.tsx
│   │   │   ├── ThemeToggle.test.tsx
│   │   │   └── index.ts
│   │   ├── DayNightVisuals/
│   │   │   ├── DayNightVisuals.tsx
│   │   │   ├── DayNightVisuals.test.tsx
│   │   │   └── index.ts
│   │   ├── Header/
│   │   └── index.ts             # Barrel export
│   │
│   └── index.ts                 # 頂層 Barrel export (可選)
│
├── context/                     # React Context + Providers
│   ├── theme/
│   │   ├── ThemeContext.ts
│   │   ├── ThemeProvider.tsx
│   │   ├── useTheme.ts
│   │   ├── theme.types.ts
│   │   └── index.ts
│   │
│   ├── auth/                    # (可選)
│   │   ├── AuthContext.ts
│   │   ├── AuthProvider.tsx
│   │   ├── useAuth.ts
│   │   ├── auth.types.ts
│   │   └── index.ts
│   │
│   └── index.ts                 # Barrel export
│
├── features/                    # 業務特性模組
│   ├── portfolio/
│   │   ├── components/
│   │   │   ├── ProjectCard/
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useProjects.ts
│   │   │   └── index.ts
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   ├── skills/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── index.ts
│   │
│   └── [otherFeatures]/
│
├── hooks/                       # 全局 custom hooks
│   ├── useTheme.ts
│   ├── useLocalStorage.ts
│   └── index.ts
│
├── lib/                         # 工具庫
│   ├── utils.ts
│   ├── helpers.ts
│   ├── api.ts
│   └── index.ts
│
├── types/                       # 全局類型定義
│   ├── common.ts
│   ├── api.ts
│   └── index.ts
│
├── services/                    # API 服務
│   ├── apiService.ts
│   └── index.ts
│
├── styles/                      # 全局樣式
│   ├── globals.css
│   └── variables.css
│
├── app/                         # App Router (Next.js)
│   ├── layout.tsx
│   ├── page.tsx
│   └── (routes)/
│
└── App.tsx
```

### 目錄說明

| 目錄 | 用途 | 命名規範 | 特點 |
|------|------|---------|------|
| `features/` | 業務特性模組 | `camelCase` | 可獨立工作的功能塊 |
| `components/ui/` | 純 UI 組件庫 | `PascalCase` | 無 hooks、無邏輯、props 驅動 |
| `components/shared/` | 容器組件 | `PascalCase` | 有 hooks、有邏輯、跨 feature 共享 |
| `context/` | React Context | `camelCase` (文件夾) | Context + Provider + Hook 分離 |
| `hooks/` | 全局 custom hooks | `camelCase` | 可復用的邏輯 |
| `lib/` | 工具函數 | `camelCase` | 幫助函數、常量 |
| `types/` | 全局類型定義 | `camelCase` | 通用和 API 相關類型 |
| `services/` | API 調用服務 | `camelCase` | 數據服務層 |

---

## Code Style & Conventions

### 1. 命名規範

#### 變數和函數
```typescript
// ✅ Good
const userName = 'John';
const calculateTotal = () => {};
let isLoading = false;

// ❌ Bad
const UserName = 'John';
const calculate_total = () => {};
let IsLoading = false;
```

#### 常數
```typescript
// ✅ Good
const MAX_RETRY_COUNT = 3;
const API_TIMEOUT = 5000;
const DEFAULT_PAGE_SIZE = 20;

// ❌ Bad
const maxRetryCount = 3;
const api_timeout = 5000;
```

#### 組件和組件目錄
```typescript
// ✅ Good
components/ui/Button/Button.tsx
components/ui/LightBox/LightBox.tsx
features/portfolio/components/ProjectCard/ProjectCard.tsx

// ❌ Bad
components/ui/button/button.tsx
components/ui/lightbox.tsx
features/portfolio/components/projectcard/ProjectCard.tsx
```

#### 頁面目錄
```
app/
├── portfolio/
├── skills/
└── about/

// ✅ Good: kebab-case
// ❌ Bad: Portfolio, Skills, About
```

### 2. TypeScript & 類型規範

```typescript
// ✅ 總是指定返回類型
const calculateTotal = (items: Item[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ✅ 導出類型定義
export interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';

// ✅ 使用類型文件組織
// types/user.ts
export interface User extends UserProfile {
  role: UserRole;
}

// ❌ 避免使用 any
const processData = (data: any) => {}; // 不推薦

// ✅ 用 unknown 或具體類型替代
const processData = (data: unknown) => {};
```

### 3. 代碼格式化

#### 運行 Prettier
```bash
# 檢查格式
npm run format:check

# 格式化並修復
npm run format:fix
```

#### 運行 ESLint
```bash
# 檢查代碼品質
npm run lint:check

# 自動修復問題
npm run lint:fix
```

#### 運行 Prettier & ESLint

```bash
# 檢查 Prettier & ESLint 衝突
npm run lint-format-conflict:check
```

### 4. 導入路徑別名

使用配置好的路徑別名以提高代碼可讀性：

```typescript
// ✅ Good - 使用別名
import { Button, Modal } from '@components/ui';
import { ThemeToggle } from '@components/shared';
import { useTheme } from '@context/theme';
import { useTheme as useGlobalTheme } from '@hooks/useTheme';
import { apiService } from '@services/apiService';
import type { User } from '@types/user';
import { calculateTotal } from '@lib/utils';

// ❌ Bad - 相對路徑
import { Button } from '../../../../components/ui/Button';
import { useTheme } from '../../hooks/useTheme';
```

**tsconfig.json 配置：**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@context/*": ["src/context/*"],
      "@features/*": ["src/features/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@lib/*": ["src/lib/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

### 5. 註釋和文檔

```typescript
// ✅ 複雜邏輯添加註釋
/**
 * 計算總收入
 * @param metrics - 指標陣列
 * @param period - 時間週期（'daily' | 'weekly' | 'monthly'）
 * @returns 總收入金額
 */
export const calculateTotalRevenue = (
  metrics: Metric[],
  period: TimePeriod
): number => {
  return metrics
    .filter(m => m.period === period)
    .reduce((sum, m) => sum + m.revenue, 0);
};

// ✅ 對複雜的組件行為做說明
// 這個效果依賴於 ResizeObserver，在大屏設備上性能更佳
useEffect(() => {
  // ...
}, [dependencies]);
```

---

## Context Organization

### 目錄結構

React Context 應按以下方式組織，**分離職責**：

```
src/context/
├── theme/
│   ├── ThemeContext.ts          # Context 定義
│   ├── ThemeProvider.tsx        # Provider 組件
│   ├── useTheme.ts              # Custom hook
│   ├── theme.types.ts           # 類型定義
│   └── index.ts                 # Barrel export
│
├── auth/                        # (可選) 認證
│   ├── AuthContext.ts
│   ├── AuthProvider.tsx
│   ├── useAuth.ts
│   ├── auth.types.ts
│   └── index.ts
│
└── index.ts                     # 頂層 barrel export
```

### 為什麼分離 Context、Hook 和 Provider？

| 優勢 | 說明 |
|------|------|
| **職責單一** | 每個文件做一件事 |
| **易於測試** | 可以單獨測試各個部分 |
| **復用性高** | Hook 可以獨立導入使用 |
| **代碼清晰** | 結構明確易於維護 |
| **便於調試** | DevTools 可正確顯示 Context 名稱 |

### 完整實現

#### 1. 定義類型

```typescript
// src/context/theme/theme.types.ts
export type Theme = 'light' | 'dark';

export interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  hasFirstToggle: boolean;
}
```

#### 2. 創建 Context

```typescript
// src/context/theme/ThemeContext.ts
import React from 'react';
import type { ThemeContextValue } from './theme.types';

const defaultValue: ThemeContextValue = {
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
  hasFirstToggle: false,
};

export const ThemeContext = React.createContext<ThemeContextValue>(defaultValue);
ThemeContext.displayName = 'ThemeContext';  // ✅ 幫助 DevTools 調試
```

#### 3. 創建自定義 Hook

```typescript
// src/context/theme/useTheme.ts
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import type { ThemeContextValue } from './theme.types';

/**
 * Hook to use Theme context
 * @throws Error if used outside ThemeProvider
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  
  // ✅ 檢查是否在 Provider 內使用
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped with <ThemeProvider>'
    );
  }
  
  return context;
};
```

#### 4. 創建 Provider 組件

```typescript
// src/context/theme/ThemeProvider.tsx
'use client';

import React, { useEffect, useState, ReactNode } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme, ThemeContextValue } from './theme.types';

export interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider = ({
  children,
  initialTheme = 'light',
  storageKey = 'theme',
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [mounted, setMounted] = useState(false);

  // ✅ 初始化主題（從 localStorage 或系統偏好）
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme: Theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    setThemeState(resolvedTheme);
    applyTheme(resolvedTheme);
    setMounted(true);
  }, [storageKey]);

  // ✅ 應用主題到 DOM
  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    localStorage.setItem(storageKey, newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // ✅ 防止 hydration 失配（Next.js SSR 環境）
  if (!mounted) {
    return <>{children}</>;
  }

  const value: ThemeContextValue = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme,
    hasFirstToggle: true,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

#### 5. 設置 Barrel Export

```typescript
// src/context/theme/index.ts
export { ThemeProvider, type ThemeProviderProps } from './ThemeProvider';
export { useTheme } from './useTheme';
export { ThemeContext } from './ThemeContext';
export type { Theme, ThemeContextValue } from './theme.types';

// src/context/index.ts
export { ThemeProvider, useTheme } from './theme';
export { AuthProvider, useAuth } from './auth';  // 後續添加
```

### 使用 Context

#### 在根部應用 Provider

```typescript
// src/app/layout.tsx (Next.js App Router)
import { ThemeProvider } from '@context/theme';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ThemeProvider initialTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

#### 在組件中使用 Hook

```typescript
// src/components/shared/ThemeToggle/ThemeToggle.tsx
import { useTheme } from '@context/theme';

export const ThemeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};
```

### Context 最佳實踐

✅ **分離職責** - Context、Hook、Provider 各自獨立  
✅ **類型安全** - 有專門的 `.types.ts` 文件  
✅ **錯誤檢查** - Hook 內檢查 Context 是否存在  
✅ **displayName** - 幫助 DevTools 識別  
✅ **Hydration 安全** - 處理 SSR/hydration 環境  
✅ **文檔註釋** - JSDoc 說明關鍵函數  

### ❌ 常見錯誤

```typescript
// ❌ 不要：在 Provider 內使用自己的 Context
export const ThemeProvider = () => {
  const context = useContext(ThemeContext); // 會出錯
};

// ❌ 不要：Hook 內沒有檢查 Context
export const useTheme = () => useContext(ThemeContext); // 隱藏 bug

// ❌ 不要：Context 儲存過多不相關的數據
const context = { theme, user, notifications, ... }; // 職責混亂

// ❌ 不要：忽略 hydration 失配問題
// (在 SSR 環境中會導致警告)
```

---

## Component Development Guide

### 關鍵概念：Presentational vs Container Components

本項目採用 **展示組件（Presentational）vs 容器組件（Container）** 模式：

#### ✅ **展示組件** (`components/ui/`)

**特徵：**
- 無任何 custom hooks 依賴
- 無業務邏輯
- 完全由 props 驅動
- 易於測試和復用

**例子：**
```typescript
// components/ui/Button/Button.tsx
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const Button = ({ children, variant, onClick }: ButtonProps) => (
  <button className={`btn btn--${variant}`} onClick={onClick}>
    {children}
  </button>
);
```

#### ✅ **容器組件** (`components/shared/`)

**特徵：**
- 使用 custom hooks（如 `useTheme`）
- 包含業務邏輯
- 跨多個 features 共享

**例子：**
```typescript
// components/shared/ThemeToggle/ThemeToggle.tsx
import { useTheme } from '@context/theme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};
```

---

## Export & Import Patterns

### 推薦：Named Export + Barrel Pattern

所有組件應使用 **命名導出** 和 **Barrel 模式**：

#### 1. UI 組件結構
```typescript
// components/ui/Button/Button.tsx
export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
}: ButtonProps) => {
  // 實現
};

// components/ui/Button/index.ts
export { Button, type ButtonProps } from './Button';
```

#### 2. 容器組件結構
```typescript
// components/shared/ThemeToggle/ThemeToggle.tsx
import { useTheme } from '@context/theme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  // 實現
};

// components/shared/ThemeToggle/index.ts
export { ThemeToggle } from './ThemeToggle';
```

#### 3. 頂層 Barrel Export（可選但推薦）
```typescript
// components/ui/index.ts
export { Button, type ButtonProps } from './Button';
export { Modal, type ModalProps } from './Modal';
export { Card, type CardProps } from './Card';
export { LightBox, type LightBoxProps } from './LightBox';
export { Input, type InputProps } from './Input';

// components/shared/index.ts
export { ThemeToggle } from './ThemeToggle';
export { DayNightVisuals } from './DayNightVisuals';
export { Header } from './Header';

// components/index.ts (可選)
export * from './ui';
export * from './shared';
```

#### 4. 使用導入
```typescript
// ✅ 最推薦：從頂層導入
import { Button, Modal, Card } from '@components/ui';
import { ThemeToggle, DayNightVisuals } from '@components/shared';

// ✅ 也可以：從子文件夾導入
import { Button } from '@components/ui/Button';
import { ThemeToggle } from '@components/shared/ThemeToggle';

// ❌ 避免：直接導入文件
import { Button } from '@components/ui/Button/Button';

// ❌ 避免：混合默認和命名導出
import Button from '@components/ui/Button';  // 不一致
import { Modal } from '@components/ui/Modal';
```

### 為什麼選擇命名導出？

| 優勢 | 說明 |
|------|------|
| **Tree Shaking** | ✅ 支持死碼消除，減小打包體積 |
| **IDE 支持** | ✅ 重構、自動補全更強大 |
| **顯式性** | ✅ 清楚看到導入的是什麼 |
| **一致性** | ✅ 所有導入都用相同的 `{}` 語法 |

---

### 類型定義位置

#### 全局通用類型 → `types/`
```typescript
// types/common.ts
export interface MediaItem {
  src: string;
  alt: string;
  caption?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
```

#### 組件特定類型 → 組件內
```typescript
// components/ui/LightBox/LightBox.types.ts
import type { MediaItem } from '@types/common';

export interface LightBoxProps {
  items: MediaItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

// components/ui/LightBox/LightBox.tsx
import type { LightBoxProps } from './LightBox.types';

export const LightBox = (props: LightBoxProps) => {
  // 實現
};

// components/ui/LightBox/index.ts
export { LightBox, type LightBoxProps } from './LightBox';
```

---

## Creating Components

### 創建新的 UI 組件

#### 1. 創建目錄和文件
```bash
mkdir -p src/components/ui/ComponentName
touch src/components/ui/ComponentName/{ComponentName.tsx,index.ts,ComponentName.test.tsx}
```

#### 2. 實現組件
```typescript
// ComponentName.tsx
export interface ComponentNameProps {
  // Props 定義
}

export const ComponentName = (props: ComponentNameProps) => {
  // 實現
};

// index.ts
export { ComponentName, type ComponentNameProps } from './ComponentName';
```

#### 3. 編寫測試
```typescript
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders correctly', () => {
    render(<ComponentName />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### 創建新的 Feature

#### 1. 目錄結構
```
features/featureName/
├── components/
│   ├── ComponentName/
│   │   ├── ComponentName.tsx
│   │   └── index.ts
│   └── index.ts
├── hooks/
│   ├── useCustomHook.ts
│   └── index.ts
├── types.ts
└── index.ts
```

#### 2. 特性導出
```typescript
// features/featureName/index.ts
export { ComponentName } from './components/ComponentName';
export type { FeatureType } from './types';
export { useCustomHook } from './hooks/useCustomHook';
```

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

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 規範：

```bash
# 功能
git commit -m "feat: add LightBox component with carousel support"

# 修復
git commit -m "fix: resolve Button click event on mobile"

# 文檔
git commit -m "docs: update component guidelines"

# 樣式
git commit -m "style: format code with Prettier"

# 測試
git commit -m "test: add unit tests for LightBox"

# 重構
git commit -m "refactor: improve component structure"
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

---

## Running Tests

### 執行測試

```bash
# 運行所有測試
npm run test

# 監聽模式
npm run test:watch

# 覆蓋率報告
npm run test:coverage
```

### 測試覆蓋率目標

```
Statements   : 70% +
Branches     : 65% +
Functions    : 70% +
Lines        : 70% +
```

### 測試最佳實踐

```typescript
// ✅ Good - 測試用戶行為
describe('LightBox', () => {
  it('displays current image', () => {
    const items = [{ src: 'image.jpg', alt: 'test' }];
    render(<LightBox items={items} currentIndex={0} onNext={() => {}} onPrev={() => {}} onClose={() => {}} />);
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });
});

// ❌ Bad - 測試實現細節
describe('LightBox', () => {
  it('calls useState', () => {
    // 不應該這樣測試
  });
});
```

---

## 常見開發任務

### 添加新的全局 Hook

```typescript
// hooks/useLocalStorage.ts
export const useLocalStorage = <T,>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('useLocalStorage error:', error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('useLocalStorage error:', error);
    }
  };

  return [storedValue, setValue] as const;
};

// hooks/index.ts
export { useLocalStorage } from './useLocalStorage';
```

---

## 需要幫助？

- 📖 查看項目 [README.md](./README.md)
- 🐛 回報問題：建立一個 GitHub Issue
- 💬 討論：使用 GitHub Discussions
- 📧 聯絡維護者

---

## 許可證

通過貢獻本項目，你同意你的貢獻在項目的許可證下發布。

感謝你的貢獻！ 🎉
