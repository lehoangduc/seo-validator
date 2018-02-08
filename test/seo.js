'use strict'

const seoChecker = require('../index')
const { FileInput } = require('../lib/input')
const { ConsoleOutput } = require('../lib/output')
const { RuleExistTag,
  RuleTagExistAttribute,
  RuleTagExistAttributeValue,
  RuleTagCountLimit,
  RuleTagCountWithoutAttribute } = require('../lib/rule')

const filePath = './index.html'
const input = new FileInput(filePath)
const output = new ConsoleOutput()

seoChecker.setInput(input)
seoChecker.setOutput(output)
seoChecker.addRule(new RuleExistTag('', 'h2'))
seoChecker.addRule(new RuleTagExistAttribute('', 'meta', 'name'))
seoChecker.addRule(new RuleTagExistAttributeValue('head', 'meta', 'name', 'keywords'))
seoChecker.addRule(new RuleTagExistAttributeValue('head', 'meta', 'name', 'keywords'))
seoChecker.addRule(new RuleTagCountLimit('', 'h1', 2))
seoChecker.addRule(new RuleTagCountWithoutAttribute('', 'img', 'alt'))

try {
  seoChecker
    .validate()
    .then(async () => {
      await seoChecker.getResult()
    })
} catch (err) {
  console.log(err)
}
