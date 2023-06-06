module.exports = {
  env: {
    commonjs: "true",
    node: true,
    es2021: true,
    jest: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": 0,
  },
};
