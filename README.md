## 筆記

- 存儲檔案時，應用 eslint 的修正，以及 prettier 的格式化，至少需要在 settings.json 新增以下設定

  ```
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
  },
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
  ```

- eslint-config-prettier 用於避免 eslint 和 prettier 的衝突，安裝後，在 eslint 設定檔的 extends 最後添加 "prettier"，即可覆蓋其他設定