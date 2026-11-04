import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { codeStyleFiles, codeStyleRules } from "./eslint.code-style.js";

export default tseslint.config(
    {
        ignores: ["dist/**", "build/**", "coverage/**", "components/**", ".yalc/**", "crud/**"]
    },
    {
        files: codeStyleFiles,
        languageOptions: {
            parser: tseslint.parser
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin
        }
    },
    prettier,
    // Keep structural rules after Prettier; curly with "all" is compatible with formatting.
    {
        files: codeStyleFiles,
        rules: codeStyleRules
    }
);
