#!/usr/bin/env node
import program, { Command } from 'commander'
import chalk from 'chalk'
import initCommand from './init'

const packageJson = require('../../package.json')

const triggerError = (command: Command, text: string) => {
  console.error(chalk.red(`[Error] ${text}\n`))
  command.outputHelp()
}

const triggerErrorTooManyArgs = (command: Command, expected: number|string)  => {
  triggerError(command, `Too many arguments, there are ${command.parent.rawArgs.length - 3} instead of ${expected}`)
}

const testMaxArgsCount = (command: Command, limit: number) => command.parent.rawArgs.length > limit + 3

program
  .name("kiwi")
  .version(packageJson.version)
  .description(packageJson.description)

program
  .command('init [path]')
  .description('create a new Kiwi project')
  .action((path: string, command: Command) => {
    if(typeof path === "undefined") {
      initCommand(process.cwd())
    } else if(testMaxArgsCount(command, 1)) {
      triggerErrorTooManyArgs(command, "0 or 1")
    } else {
      initCommand(path)
    }
  })

program
  .command('install')
  .description('sets up project dependencies')

program
  .command('start [platform]')
  .description('launch app for development purposes')
  .action((env, options) => {
  }).on('-h, --help', () => {
    console.log('\nExamples :');
    console.log();
    console.log('  $ kiwi start');
    console.log('  $ kiwi start web');
    console.log();
  })

program
  .command('upgrade')
  .description('updates the entire project to the latest versions')

program
  .command('build')
  .description('create a production version of your Kiwi project')
  .option('-w, --web', 'web bundle only')
  .option('-l, --linux', 'Linux package only')
  .option('-W, --windows', 'Windows package only')
  .option('-m, --mac', 'Mac OS package only')
  .option('-a, --android', 'Android package only')
  .option('-i, --ios', 'iOS package only')

program.parse(process.argv)

if(!process.argv.slice(2).length) {
  program.outputHelp()
}
