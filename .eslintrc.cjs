module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:unused-imports/recommended",
  ],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs"], // ✅ node_modules도 추가
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "unused-imports", "unused-exports"], // ✅ `unused-imports`, `unused-exports` 추가
  rules: {
    "react/jsx-no-target-blank": "off",
    "react/prop-types": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "unused-imports/no-unused-imports": "warn", // ✅ 사용하지 않는 import 감지
    "unused-imports/no-unused-vars": "warn", // ✅ 사용되지 않는 변수 감지
    "unused-exports/no-unused-exports": [
      "warn",
      {
        unusedExports: true, // ✅ 사용되지 않는 export 감지
        ignoreExports: ["App", "index"], // 특정 파일 제외 가능
      },
    ],
  },
};
