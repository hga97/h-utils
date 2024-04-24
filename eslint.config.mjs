import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

// todo: eslint 为生效
export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      semi: [ 2, "never"],
    }
  }
];
