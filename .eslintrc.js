module.exports = {
  env: {
    browser: true,
    es6: "true",
    node: true,
    es2020: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    quotes: ["error", "double"],
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
};
