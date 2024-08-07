import stylelint, { Rule } from 'stylelint'

const {
  createPlugin,
  utils: { report, ruleMessages, validateOptions },
} = stylelint

const ruleName = 'bezier/selector-no-foo'

const messages = ruleMessages(ruleName, {
  rejected: (selector) => `Unexpected "foo" within selector "${selector}"`,
})

const meta = {
  url: 'https://github.com/foo-org/stylelint-selector-no-foo/blob/main/README.md',
}

const pluginRule: Rule<boolean> = (primary, secondaryOptions, context) => {
  return (root, result) => {
    const validOptions = validateOptions(result, ruleName, {
      actual: primary,
      possible: [true],
    })

    if (!validOptions) return

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode

      if (!selector.includes('foo')) return

      report({
        result,
        ruleName,
        message: messages.rejected(selector),
        node: ruleNode,
        word: selector,
      })
    })
  }
}

pluginRule.ruleName = ruleName
pluginRule.messages = messages

// @ts-ignore
const { rule } = createPlugin(ruleName, pluginRule)

export { ruleName, messages, rule }
