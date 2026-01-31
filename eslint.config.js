import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { configs as wdioConfig } from "eslint-plugin-wdio";

console.log("ESLint configuration loaded.", wdioConfig["flat/recommended"]);
export default [
    {
        ignores: [".yalc/**"],
    },
    {
        files: ["./test/specs/**/*.{js,mjs,cjs,ts}"],
    },
    wdioConfig["flat/recommended"],
    {
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.mocha,
            },
            parserOptions: {
                projectService: true,
            },            
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        // rules: {
        //     "@typescript-eslint/no-explicit-any": "warn",
        //     "@typescript-eslint/no-unused-vars": "warn"
        // }
    }
];
