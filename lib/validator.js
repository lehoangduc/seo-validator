'use strict'

const cheerio = require('cheerio')
const {
  Rule,
  RuleExistTag,
  RuleTagExistAttribute,
  RuleTagExistAttributeValue,
  RuleTagCountLimit,
  RuleTagCountWithoutAttribute
} = require('../lib/rule')
const { Input, FileInput, StreamInput } = require('../lib/input')
const { Output, ConsoleOutput, FileOutput, StreamOutput } = require('../lib/output')

class Validator {
  constructor(skipPredefinedRules) {
    this.input = null
    this.output = null
    this.dom = null

    if (!skipPredefinedRules) {
      this.rules = [
        new RuleTagCountWithoutAttribute('', 'img', 'alt'),
        new RuleTagCountWithoutAttribute('', 'a', 'rel'),
        new RuleExistTag('head', 'title'),
        new RuleTagExistAttributeValue('head', 'meta', 'name', 'description'),
        new RuleTagExistAttributeValue('head', 'meta', 'name', 'keywords'),
        new RuleTagCountLimit('', 'strong', 15),
        new RuleTagCountLimit('', 'h1', 1)
      ]
    } else {
      this.rules = []
    }

    this.errors = []
  }

  skipRules(indexes) {
    indexes.forEach(i => {
      this.rules[i-1] && delete this.rules[i-1]
    })
  }

  setInput(input) {
    this.input = input
  }

  setOutput(output) {
    this.output = output
  }

  addRule(rule) {
    rule && this.rules.push(rule)
  }

  async validate() {
    const data = await this.input.read();
    this.dom = cheerio.load(data);

    this.rules.forEach((rule) => {
      rule.setDom(this.dom)
      rule.validate()

      const error = rule.error()
      error && this.errors.push(error)
    });
  }

  async getResult() {
    this.output.setData(this.errors.length ? this.errors.join("\r\n") : 'All are good')
    await this.output.write()
  }
}

module.exports = {
  Validator,
  Rule,
  RuleExistTag,
  RuleTagExistAttribute,
  RuleTagExistAttributeValue,
  RuleTagCountLimit,
  RuleTagCountWithoutAttribute,
  Input,
  FileInput,
  StreamInput,
  Output,
  ConsoleOutput,
  FileOutput,
  StreamOutput
}