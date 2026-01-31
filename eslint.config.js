import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { configs as wdioConfig } from "eslint-plugin-wdio";

export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
    },
    wdioConfig["flat/recommended"],
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.mocha,
            }
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": "warn"
        }
    }
];
