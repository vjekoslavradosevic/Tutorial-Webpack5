module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    extends: "airbnb-base",
    overrides: [
        {
            env: {
                node: true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    ignorePatterns: ["webpack.config.js", "*.txt"], // ignorira datoteku webpack.config.js i sve tekstualne datoteke
    rules: {
        // 0 = off, 1 = warn, 2 = error
        "no-unused-vars": [1, { vars: "all", args: "after-used", ignoreRestSiblings: false }],
        indent: ["error", 4], // od koliko znakova se sastoji indentacija i koju razinu upozorenja javlja
        quotes: [2, "double"], // koja vrsta navodnika se preferira i koju razinu upozorenja javlja
    },
};
