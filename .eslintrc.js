module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['vue-standard'],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-control-regex': 'off',
    'no-undef': 'off'
    // 'quotes': [1, 'single']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
