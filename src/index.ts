#!/usr/bin/env node

import { Start } from "./commands/start"
import { Test } from "./commands/test"
import { Build } from "./commands/build"
import { Deploy } from "./commands/deploy"
import { Undeploy } from "./commands/undeploy"

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
  case "deploy":
    if(process.argv.length < 4) {
      console.error(`Missing deploy stage parameter`)
      process.exit(1)
    }
    Deploy(path, process.argv[3], process.argv[4])
    break
  case "undeploy":
    if(process.argv.length < 4) {
      console.error(`Missing undeploy stage parameter`)
      process.exit(1)
    }
    Undeploy(path, process.argv[3], process.argv[4])
    break
  default:
    console.error(`The command "${process.argv[2]}" does not exist`)
    process.exit(1)
}
