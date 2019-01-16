#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var packageJson = require('../../package.json');
commander_1.default.version(packageJson.version).description(packageJson.description);
// INIT
commander_1.default.command('init', 'create a new Kiwi project').action(function (dir, command) {
    //console.log(dir, command)
    console.log("create a new Kiwi project");
});
/*
  // INSTALL
  .command('install', 'sets up project Node dependencies and Kiwi segments')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("sets up project Node dependencies and Kiwi segments")
  })

  // START
  .command('start', 'launch the development server')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("launch the development server")
  })

  // UPGRADE
  .command('upgrade', 'updates the entire project to the latest versions')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("updates the entire project to the latest versions")
  })

  // BUILD
  .command('build', 'create a production version of your Kiwi project')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("create a production version of your Kiwi project")
  })

  // ADD SEGMENT
  .command('add [segment]', 'adds a given segment to the project')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("]', 'adds a given segment to the project")
  })

  // UPDATE SEGMENT
  .command('update [segment]', 'updates a particular segment')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("]', 'updates a particular segment")
  })

  // REMOVE SEGMENT
  .command('remove [segment]', 'removes a segment from the project')
  .action((dir, command) => {
    //console.log(dir, command)
    console.log("]', 'removes a segment from the project")
  })

  .parse(process.argv)

*/
commander_1.default.parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
