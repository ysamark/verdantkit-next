import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    "@typescript-eslint/no-explicit-any": "off",
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
