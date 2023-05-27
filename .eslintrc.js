/** @type {import('eslint').ESLint.ConfigData}*/
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended',
    'prettier', // Make sure this is always the last element in the array.
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['jsdoc'],
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
  },
  ignorePatterns: ['src/generated/**/*'],
};
