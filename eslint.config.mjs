import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // ✅ Add ignores at the top-level
  {
    ignores: ["**/.next/**", "**/node_modules/**", "**/dist/**", "**/*.log"],
  },

  // ✅ Extend Next.js rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // ✅ Custom rules (like ignoring _key, _value, etc.)
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
];

export default eslintConfig;
