module.exports = {
  root: true,
  plugins: ['simple-import-sort'],
  extends: '@react-native-community',
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-console': 'error',
    semi: 'off',
    curly: 'off',
  },
}
