# Coding Standards

本專案的代碼風格、命名規範、類型系統與錯誤處理標準。

## Error Handling (Result Pattern)

本專案優先使用 **Safe 工具** 進行強健的錯誤處理，取代傳統的 `try-catch` 區塊。

### 核心原則
1. **優先使用 Safe 工具**：所有非同步操作（API、儲存、原生模組）與副作用必須使用 `safe()` 工具函數。
2. **禁止原始 Try-Catch**：不要在業務邏輯中使用原始的 `try-catch`；應委託給 `safe()` 處理，確保格式統一。
3. **錯誤優先處理**：呼叫後必須立即處理 `if (error)`，才能存取 `data`。

### 實作範例

```typescript
// @util/safe.ts
export const safe = async <T, E = Error>(
  promise: Promise<T>
): Promise<{ data: T | null; error: E | null }> => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
};

// 使用方式
import { safe } from '@util/safe';

const { data, error } = await safe(apiService.getData());

if (error) {
  // 立即處理錯誤
  return <ErrorState message={error.message} />;
}

// 之後才安全存取 data
return <DataView data={data} />;
```

---

## Code Style & Conventions

### 命名規範

#### 專案規則
- **具名導出 (Named Export)**：一律使用具名導出（例如 `export const MyComponent...`），以利 IDE 自動匯入與 Tree Shaking。

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

### TypeScript & 類型規範

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

### 代碼格式化

專案使用 Prettier 負責格式化，ESLint 負責代碼品質。

#### 避免衝突 (ESLint & Prettier)

為了確保兩者協作順暢，請遵循以下原則：

- **使用 `eslint-config-prettier`**：這用於關閉所有可能與 Prettier 衝突的 ESLint 規則。在 ESLint 設定檔的 `extends` 最後添加 `"prettier"` 即可。
- **避免使用 `eslint-plugin-prettier`**：不建議安裝此插件。雖然它可以讓 ESLint 顯示格式錯誤，但會讓 ESLint 也擁有格式化能力，容易與單純的 Prettier 運作產生衝突。

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

### 導入路徑別名

使用配置好的路徑別名以提高代碼可讀性：

```typescript
// ✅ Good - 使用別名
import { Button, Modal } from '@components/ui';
import { ThemeToggle } from '@components/shared';
import { useTheme } from '@context/theme';
import { useTheme as useGlobalTheme } from '@hooks/useTheme';
import { apiService } from '@services/apiService';
import type { User } from '@types/user';
import { calculateTotal } from '@util/common';

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
      "@util/*": ["src/util/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

### 註釋和文檔

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
