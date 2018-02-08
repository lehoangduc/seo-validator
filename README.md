<h1 align="center">seo-validator</h1>
<h5 align="center">A Node.js package scan a HTML content and show all of SEO defects.</h5>

[![npm package](https://nodei.co/npm/seo-validator.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/seo-validator/)

<br />

```js
const { Validator, FileInput, ConsoleOutput } = require('seo-validator')

const validator = new Validator()
const filePath = __dirname + '/index.html'
const input = new FileInput(filePath)
const output = new ConsoleOutput()

// Skip predefined rules
validator.skipRules([1,4,5])

validator.setInput(input)
validator.setOutput(output)

try {
  validator
    .validate()
    .then(async () => {
      await validator.getResult()
    })
} catch (err) {
  console.error(err)
}
```

## Installation
`npm install seo-validator`

## Predefined Rules
1. Detect if there are any `<img />` tags without alt attribute<br />
2. Detect if there are any `<a />` tags without rel attribute<br />
3. In `<head>` tag<br />
    i. Detect if there is any header that doesn’t have `<title>` tag<br />
    ii. Detect if there is any header that doesn’t have `<meta name="descriptions" … />` tag<br />
    iii. Detect if there is any header that doesn’t have `<meta name="keywords" … />` tag<br />
4. Detect if there are more than 15 `<strong>` tag in HTML <br />
5. Detect if a HTML have more than one `<h1>` tag<br />

## API
### Rule
```js
const {
    RuleExistTag,
    RuleTagExistAttribute,
    RuleTagExistAttributeValue,
    RuleTagCountLimit,
    RuleTagCountWithoutAttribute
} = require('seo-validator')

new RuleExistTag('head', 'title')
new RuleTagExistAttribute('head', 'img', 'alt')
new RuleTagExistAttributeValue('head', 'meta', 'name', 'description')
new RuleTagCountLimit('', 'strong', 15)
new RuleTagCountWithoutAttribute('', 'img', 'alt')

// Add rules
validator.addRule(new RuleExistTag('head', 'title'))
validator.addRule(new RuleTagExistAttribute('head', 'img', 'alt'))
```

### Input
```js
const fs = require('fs')
const { FileInput, StreamInput } = require('seo-validator')

const filePath = __dirname + '/index.html'
const input = new FileInput(filePath)

//const stream = fs.createReadStream(filePath)
//const input = new StreamOutput(stream)

validator.setInput(input)
```

### Output
```js
const fs = require('fs')
const { ConsoleOutput, FileOutput, StreamOutput } = require('seo-validator')

const filePath = __dirname + '/result.log'
const output = new ConsoleOutput()

//output = new FileOutput(filePath)

//const stream = fs.createWriteStream(filePath)
//const output = new StreamOutput(stream)

validator.setOutput(output)
```