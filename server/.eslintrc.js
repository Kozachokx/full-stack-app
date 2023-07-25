module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: [
      'error',
      'single',
    ],
    semi: [
      'error',
      'always',
    ],
    'no-return-await': 'off',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
    // 'no-console': 'off',
  },
};
