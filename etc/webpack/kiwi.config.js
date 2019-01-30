const fs = require('fs')
const pathLib = require('path')
const yamlParse = require("yamljs").parse

module.exports = webpackConfigGenerator => new Promise((resolve, reject) => {
  fs.readFile(pathLib.join(process.cwd(), "kiwi.yml"), (error, data) => {
    if(error) {
      reject(null)
    } else {
      resolve(webpackConfigGenerator(yamlParse(data.toString('utf-8'))))
    }
  })
})
