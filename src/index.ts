#!/usr/bin/env node
import chalk from 'chalk'
import commander from 'commander'

const packageJson = require('../package.json')

commander
  .version(packageJson.version)
  .description(packageJson.description)

  // INIT
  .command('init', 'create a new Kiwi project')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // INSTALL
  .command('install', 'sets up project Node dependencies and Kiwi segments')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // START
  .command('start', 'launch the development server')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // UPGRADE
  .command('upgrade', 'updates the entire project to the latest versions')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // BUILD
  .command('build', 'create a production version of your Kiwi project')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // ADD SEGMENT
  .command('add [segment]', 'adds a given segment to the project')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // UPDATE SEGMENT
  .command('update [segment]', 'updates a particular segment')
  .action((dir, command) => {
    console.log(dir, command)
  })

  // REMOVE SEGMENT
  .command('remove [segment]', 'removes a segment from the project')
  .action((dir, command) => {
    console.log(dir, command)
  })

  .parse(process.argv)

if(!process.argv.slice(2).length) {
  commander.outputHelp()
}
