module.exports = {
  plugins: ['compat'],
  extends: [require.resolve('@umijs/fabric/dist/eslint'), 'plugin:compat/recommended', 'plugin:security/recommended-legacy'],
  globals: {
    page: true,
    REACT_APP_ENV: true,
  },
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['./src/**/*.spec.ts?(x)'],
      extends: ['plugin:testing-library/react'],
      plugins: ['testing-library'],
      rules: {
        'testing-library/await-async-query': 'error',
        'testing-library/no-await-sync-query': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'off',
      },
    },
  ],
};
