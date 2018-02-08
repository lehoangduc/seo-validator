'use strict'

class Rule {
  constructor(rootTag) {
    this.root = rootTag ? rootTag : 'html'
    this.dom = null
    this.isValid = false
  }

  setDom(dom) {
      this.dom = dom
  }

  validate() {}
  error() {}
}

class RuleExistTag extends Rule {
  constructor(rootTag, tag) {
    super(rootTag)
    this.tag = tag
  }

  validate() {
    this.isValid = this.dom(`${this.root} ${this.tag}`).length > 0
  }

  error() {
    return !this.isValid ? `This HTML without <${this.tag}> tag` : ''
  }
}

class RuleTagExistAttribute extends Rule {
  constructor(rootTag, tag, attr) {
    super(rootTag)
    this.tag = tag
    this.attr = attr
  }

  validate() {
    this.isValid = this.dom(`${this.root} ${this.tag}[${this.attr}]`).length > 0
  }

  error() {
    return !this.isValid ? `This HTML without <${this.tag} ${this.attr}> tag` : ''
  }
}

class RuleTagExistAttributeValue extends Rule {
  constructor(rootTag, tag, attr, value) {
    super(rootTag)
    this.tag = tag
    this.attr = attr
    this.value = value
  }

  validate() {
    this.isValid = this.dom(`${this.root} ${this.tag}[${this.attr}*=${this.value}]`).length > 0
  }

  error() {
    return !this.isValid ? `This HTML without <${this.tag} ${this.attr}="${this.value}"> tag` : ''
  }
}

class RuleTagCountLimit extends Rule {
  constructor(rootTag, tag, limit) {
    super(rootTag)
    this.tag = tag
    this.limit = limit
  }

  validate() {
    this.isValid = this.dom(`${this.root} ${this.tag}`).length <= this.limit
  }

  error() {
    return !this.isValid ? `This HTML have more than ${this.limit} <${this.tag}> tag` : ''
  }
}

class RuleTagCountWithoutAttribute extends Rule {
  constructor(rootTag, tag, attr) {
    super(rootTag)
    this.tag = tag
    this.attr = attr
  }

  validate() {
    const $e = this.dom(`${this.root} ${this.tag}:not([${this.attr}])`)
    this.total = $e.length
    this.isValid = !this.total
  }

  error() {
    return !this.isValid ? `There are ${this.total} <${this.tag}> tag without ${this.attr} attribute` : ''
  }
}

module.exports = {
  Rule,
  RuleExistTag,
  RuleTagExistAttribute,
  RuleTagExistAttributeValue,
  RuleTagCountLimit,
  RuleTagCountWithoutAttribute
}