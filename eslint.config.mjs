import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "next-env.d.ts",
      "public/**",
      "packages/cubix/dist/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  {
    // Docs demos pass native <img> into AttachmentMedia the same way consumers will.
    files: ["app/docs/components/attachment/**/*.{ts,tsx}"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    // Coming soon component, not shipped in the registry yet. Its list/listitem
    // semantics are reworked when the component is finalized; remove this then.
    files: ["components/cubix/base/prompt-suggestion.tsx"],
    rules: {
      "jsx-a11y/role-supports-aria-props": "off",
    },
  },
];

export default eslintConfig;
