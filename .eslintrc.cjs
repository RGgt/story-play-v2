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
  ignorePatterns: ['*/*/lib/*.js', '*/*/src/index.d.ts', '*.js'],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    'no-underscore-dangle': 0,
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
    'no-extra-boolean-cast': 0,
    'no-param-reassign': ['error', { props: false }],
    'prefer-template': 0,
    '@typescript-eslint/lines-between-class-members': 'warn',
    '@typescript-eslint/no-inferrable-types': 'warn',
  },
};
