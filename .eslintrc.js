module.exports = {
  extends: ['eslint-config-standard', 'eslint-config-react-app', 'eslint-config-prettier', 'eslint-config-prettier/react'],
  env: {
    'jest/globals': true
  },
  plugins: ['eslint-plugin-jest', 'eslint-plugin-prettier'],
  rules: {
    'comma-dangle': 'off',
    "prettier/prettier": "error",
    'space-before-function-paren': 'off',
    'standard/no-callback-literal': 'off',
    'semi': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
