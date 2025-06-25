import { FlatCompat } from "@eslint/eslintrc";
import sortingPlugin from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    plugins: {
      "simple-import-sort": sortingPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 📦 External packages (React, Next, etc.)
            ["^react", "^next", "^@?\\w"],
            // 🧱 Absolute imports from "@/..."
            ["^@/"],
            // 🧩 Relative imports ("./", "../")
            ["^\\."],
            // 📄 Side-effect imports (e.g., "import './global.css'")
            ["^\\u0000"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
    },
  },
];

export default eslintConfig;
