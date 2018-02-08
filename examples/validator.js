'use strict'

const fs = require('fs')
const { Validator } = require('../lib/validator')
const { FileInput } = require('../lib/input')
const { ConsoleOutput, StreamOutput } = require('../lib/output')
const { RuleExistTag,
  RuleTagExistAttribute,
  RuleTagExistAttributeValue,
  RuleTagCountLimit,
  RuleTagCountWithoutAttribute } = require('../lib/rule')

const validator = new Validator()
const filePath = __dirname + '/index.html'
const input = new FileInput(filePath)
//const output = new ConsoleOutput()

const wstream = fs.createWriteStream(__dirname + '/result.log')
const output = new StreamOutput(wstream)

//validator.skipRules([1])
validator.setInput(input)
validator.setOutput(output)
validator.addRule()
try {
  validator
    .validate()
    .then(async () => {
      await validator.getResult()
    })
} catch (err) {
  console.error(err)
}
