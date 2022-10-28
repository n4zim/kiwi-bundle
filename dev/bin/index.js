#!/usr/bin/env node

const Start = require("./start")
const Test = require("./test")
const Build = require("./build")

if(process.argv.length === 2) {
  console.error("No command argument")
  process.exit(1)
}

const path = process.cwd()

const args = process.argv.slice(3)

switch(process.argv[2]) {
  case "start":
    Start(path, args)
    break
  case "test":
    Test(path, args)
    break
  case "build":
    Build(path, args)
    break
  default:
    console.error(`The command "${process.argv[2]}" does not exist`)
    process.exit(1)
}
