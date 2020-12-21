module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
  ],
  parser: 'babel-eslint',
  rules: {
    'linebreak-style': 0,
    'no-restricted-syntax': 0,
    'keyword-spacing': 0,
    'no-console': 0,
    'prettier/prettier': 'error',
  },
};
