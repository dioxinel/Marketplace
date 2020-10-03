module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.js',
    },
  },
  extends: ["airbnb", "plugin:testcafe/recommended", "prettier", "prettier/react"],
  globals: { fetch: false },
  plugins: ['react', 'testcafe', 'prettier'],
  env: {
    jest: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['js'],
      },
      alias: {
        map: [['src', './src']],
      },
    },
  },
  rules: {
    'max-len': [2, 100, 2],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'function-paren-newline': 0,
    'import/prefer-default-export': 0,
    'no-trailing-spaces': ['error', { skipBlankLines: true }],
    'no-underscore-dangle': 0,
    'class-methods-use-this': 'off',
    'arrow-parens': 'off',
    'no-param-reassign': 0,
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "no-restricted-syntax": 0,
    'no-unused-expressions': 'off',
    'prettier/prettier': 'error',
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": 0,
    "react/require-default-props": 0,
    "no-unused-expressions": 'error',
  },
};
