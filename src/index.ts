#!/usr/bin/env node

import { Start } from "./commands/start"
import { Test } from "./commands/test"
import { Build } from "./commands/build"

if(process.argv.length === 2) {
  console.error("No command argument")
  process.exit(1)
}

if(process.argv.length !== 3) {
  console.error(`Too much arguments (${process.argv.length - 2} instead of 1)`)
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
