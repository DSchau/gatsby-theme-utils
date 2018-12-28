module.exports = {
  extends: ['eslint-config-standard'],
  env: {
    'jest/globals': true
  },
  plugins: ['eslint-plugin-jest'],
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'standard/no-callback-literal': 'off',
    'semi': 'off'
  }
}
