module.exports = {
  plugins: ['./plugins/foo-rule', './plugins/validate-token'],
  rules: {
    'bezier/selector-no-foo': true,
    'bezier/validate-token': true,
  },
}
