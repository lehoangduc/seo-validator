'use strict'

const fs = require('fs')

class Output {
  constructor() {
    this.data = ''
  }

  setData(data) {
    this.data = data
  }

  async write() {}
}

class ConsoleOutput extends Output {
  async write() {
    console.log(this.data)
  }
}

class FileOutput extends Output {
  constructor(path) {
    super()
    this.path = path
  }

  async write() {
    await fs.writeFile(this.path, this.data)
  }
}

class StreamOutput extends Output {
  constructor(stream) {
    super()
    this.stream = stream
  }

  writeStream() {
    return new Promise((resolve, reject) => {
      this.stream.write(this.data)
      this.stream.end()

      this.stream.on('error', (err) => {
        reject(err)
      })

      this.stream.on('finish', () => {
        resolve()
      });
    })
  }

  async write() {
    await this.writeStream()
  }
}


module.exports = { Output, ConsoleOutput, FileOutput, StreamOutput }