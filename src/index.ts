#!/usr/bin/env node

import { Start } from "./commands/start"
import { Build } from "./commands/build"
import { PostInstall } from "./commands/postinstall"

if(process.argv.length === 2) {
  console.error("No command argument")
  process.exit(1)
}

const path = process.cwd()
switch(process.argv[2]) {
  case "start":
    Start(path)
    break
  case "build":
    Build(path)
    break
  case "postinstall":
    PostInstall(path)
    break
  default:
    console.error(`The command "${process.argv[2]}" does not exist`)
    process.exit(1)
}
