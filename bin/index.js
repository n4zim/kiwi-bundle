#!/usr/bin/env node

import Start from "./start.js"
import Test from "./test.js"
import Build from "./build.js"

if(process.argv.length === 2) {
  console.error("No command argument")
  process.exit(1)
}

const path = process.cwd()
switch(process.argv[2]) {
  case "start":
    Start(path)
    break
  case "test":
    Test(path)
    break
  case "build":
    Build(path)
    break
  default:
    console.error(`The command "${process.argv[2]}" does not exist`)
    process.exit(1)
}
