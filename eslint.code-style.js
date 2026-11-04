export const codeStyleFiles = ["**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts}"];

export const codeStyleRules = {
    curly: ["error", "all"],
    "no-nested-ternary": "error",
    "@typescript-eslint/consistent-type-imports": [
        "error",
        {
            prefer: "type-imports",
            fixStyle: "separate-type-imports",
            disallowTypeAnnotations: true
        }
    ]
};
