#!/usr/bin/env node
import program, { Command } from "commander"
import chalk from "chalk"
import initCommand from "./init"
import startCommand from "./start"
import buildCommand from "./build"

const packageJson = require("../../package.json")

const triggerError = (command: Command, text: string) => {
  console.error(chalk.red(`[ERROR] ${text}\n`))
}

const generateErrorTooManyArgs = (command: Command, expected: number|string)  => {
  return `Too many arguments, there are ${command.parent.rawArgs.length - 3} instead of ${expected}`
}

const testMaxArgsCount = (command: Command, limit: number) => command.parent.rawArgs.length > limit + 3

const tryCatch = (command: Command, action: any) => {
  try {
    action()
  } catch(exception) {
    triggerError(command, exception)
  }
}

program
  .name("kiwi")
  .version(packageJson.version)
  .description(packageJson.description)

program
  .command("init [path]")
  .description("create a new Kiwi project")
  .action((path: string, command: Command) => tryCatch(command, () => {
    if(typeof path === "undefined") {
      initCommand(process.cwd())
    } else if(testMaxArgsCount(command, 1)) {
      command.outputHelp()
      console.log()
      throw generateErrorTooManyArgs(command, "0 or 1")
    } else {
      initCommand(path)
    }
  }))

program
  .command("install")
  .description("sets up project dependencies")

program
  .command("start [platform]")
  .description("launch app for development purposes")
  .action(() => {
    startCommand(process.cwd())
  })
  .on("-h, --help", () => {
    console.log("\nExamples :")
    console.log()
    console.log("  $ kiwi start")
    console.log("  $ kiwi start web")
    console.log()
  })

program
  .command("upgrade")
  .description("updates the entire project to the latest versions")

program
  .command("build")
  .description("create a production version of your Kiwi project")
  .action(() => {
    buildCommand(process.cwd())
  })
  .option("-w, --web", "web bundle only")
  .option("-l, --linux", "Linux package only")
  .option("-W, --windows", "Windows package only")
  .option("-m, --mac", "Mac OS package only")
  .option("-a, --android", "Android package only")
  .option("-i, --ios", "iOS package only")

program.parse(process.argv)

if(!process.argv.slice(2).length) {
  program.outputHelp()
}
