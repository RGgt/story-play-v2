module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  ignorePatterns: ['pages/*/lib/*.js'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: { 'prettier/prettier': 'warn' },
};
