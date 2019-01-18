#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var chalk_1 = __importDefault(require("chalk"));
var init_1 = __importDefault(require("./init"));
var start_1 = __importDefault(require("./start"));
var packageJson = require('../../package.json');
var triggerError = function (command, text) {
    console.error(chalk_1.default.red("[ERROR] " + text + "\n"));
};
var generateErrorTooManyArgs = function (command, expected) {
    return "Too many arguments, there are " + (command.parent.rawArgs.length - 3) + " instead of " + expected;
};
var testMaxArgsCount = function (command, limit) { return command.parent.rawArgs.length > limit + 3; };
var tryCatch = function (command, action) {
    try {
        action();
    }
    catch (exception) {
        triggerError(command, exception);
    }
};
commander_1.default
    .name("kiwi")
    .version(packageJson.version)
    .description(packageJson.description);
commander_1.default
    .command('init [path]')
    .description('create a new Kiwi project')
    .action(function (path, command) { return tryCatch(command, function () {
    if (typeof path === "undefined") {
        init_1.default(process.cwd());
    }
    else if (testMaxArgsCount(command, 1)) {
        command.outputHelp();
        console.log();
        throw generateErrorTooManyArgs(command, "0 or 1");
    }
    else {
        init_1.default(path);
    }
}); });
commander_1.default
    .command('install')
    .description('sets up project dependencies');
commander_1.default
    .command('start [platform]')
    .description('launch app for development purposes')
    .action(function (platform, options) {
    start_1.default(process.cwd());
}).on('-h, --help', function () {
    console.log('\nExamples :');
    console.log();
    console.log('  $ kiwi start');
    console.log('  $ kiwi start web');
    console.log();
});
commander_1.default
    .command('upgrade')
    .description('updates the entire project to the latest versions');
commander_1.default
    .command('build')
    .description('create a production version of your Kiwi project')
    .option('-w, --web', 'web bundle only')
    .option('-l, --linux', 'Linux package only')
    .option('-W, --windows', 'Windows package only')
    .option('-m, --mac', 'Mac OS package only')
    .option('-a, --android', 'Android package only')
    .option('-i, --ios', 'iOS package only');
commander_1.default.parse(process.argv);
if (!process.argv.slice(2).length) {
    commander_1.default.outputHelp();
}
