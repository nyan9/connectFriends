const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  {
    files: [
      "app.js",
      "online_logic.js",
      "eslint.config.js",
      "routes/**/*.js",
      "models/**/*.js",
      "config/**/*.js",
      "validation/**/*.js",
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^(req|res|next|err|_)" }],
      "no-console": "off",
      "no-empty": "warn",
    },
  },
  {
    ignores: ["node_modules/**", "frontend/**"],
  },
];
