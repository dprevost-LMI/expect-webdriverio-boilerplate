

import { configs as wdioConfig } from "eslint-plugin-wdio";

export default [
    {
        ignores: [".yalc/**"],
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
    },
    wdioConfig["flat/recommended"],
];
