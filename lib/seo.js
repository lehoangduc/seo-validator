'use strict'

const cheerio = require('cheerio')

class Seo {
  constructor() {
    this.input = null
    this.output = null
    this.dom = null
    this.rules = []
    this.errors = []
  }

  addRule(rule) {
    this.rules.push(rule)
  }

  setInput(input) {
    this.input = input
  }

  setOutput(output) {
    this.output = output
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

module.exports = new Seo()