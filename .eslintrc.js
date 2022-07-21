module.exports = {
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: "./tsconfig.json",
  },

  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],

  plugins: ['prettier', '@typescript-eslint'],

  env: {
    browser: true,
  },

  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.ts', '.jsx', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],

    'import/prefer-default-export': 'off',
    'react/function-component-definition': 'off',
  },
};
