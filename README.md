## 筆記

### ESLint & Prettier

- 存儲檔案時，應用 eslint 的修正，以及 prettier 的格式化，至少需要在 settings.json 新增以下設定

  ```
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  ```

- eslint-config-prettier 用於避免 eslint 和 prettier 的衝突，安裝後，在 eslint 設定檔的 extends 最後添加 "prettier"，即可覆蓋其他設定

- eslint-plugin-prettier 不建議安裝，雖然可以讓 eslint 也使用 prettier 的格式化規則，但會讓 ESLint 也擁有格式化能力，容易和 Prettier 產生衝突

- prettier-plugin-organize-imports 取代 VScode setting 的 ```"source.organizeImports": "explicit"``` 避免和 prettier 產生衝突

### Tailwind CSS

- 定義 @custom-variant XXX 時，符合該條件的元素有使用 XXX: 前綴的 Tailwind 類型，就能應用該樣式，例如以下

  ```
  globals.css

  // .dark 和 .dark 底下所有的元素
  @custom-variant dark (&:where(.dark, .dark *));


  layout.tsx

  // 符合 .dark
  <html className='dark'>
    // 符合 .dark 底下的元素，所以會採用帶有 dark: 前綴的樣式
    <body className='bg-white dark:bg-black'>
    </body>
  </html>
  ```