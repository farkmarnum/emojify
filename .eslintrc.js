module.exports = {
  parser: 'babel-eslint',

  extends: ['airbnb', 'prettier', 'prettier/react'],

  plugins: ['prettier'],

  env: {
    browser: true,
  },

  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
  },

  settings: {
    // Allow absolute paths in imports, e.g. import Button from 'components/Button'
    // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
}
