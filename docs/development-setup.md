# Development Setup

本專案的環境設置、工具需求與測試流程。

## Setup

關於專案的安裝與啟動流程，請參考 **[README.md](../README.md#setup)**。

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

為了確保開發體驗一致，建議在 `.vscode/settings.json` 中配置以下設定：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

> [!TIP]
> **關於 Import 排序**：
> 專案使用 `prettier-plugin-organize-imports` 來處理導入排序。這可以取代 VSCode 內建的 `"source.organizeImports": "explicit"` 設定，有效避免插件與編輯器之間的衝突。

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
