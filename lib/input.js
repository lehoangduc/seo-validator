'use strict'

const fs = require('fs')

class Input {
  constructor() {
    this.data = ''
  }

  async read() {}
}

class FileInput extends Input {
  constructor(path) {
    super()
    this.path = path
  }

  readFile() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, 'utf8', (err, data) => {
        if (err) return reject(err)

        resolve(data)
      })
    })
  }

  async read() {
    this.data = await this.readFile(this.path)
    return this.data
  }
}

class StreamInput extends Input {
  constructor(stream) {
    super()
    this.stream = stream
  }

  getStream() {
    return new Promise((resolve, reject) => {
      this.stream.on('data', (chunk) => {
        this.data += chunk
      })

      this.stream.on('error', (err) => {
        reject(err)
      })

      this.stream.on('end', () => {
        resolve()
      })
    })
  }

  async read() {
    await this.getStream()
    return this.data
  }
}

module.exports = { Input, FileInput, StreamInput }