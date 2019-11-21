#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var start_1 = require("./commands/start");
var test_1 = require("./commands/test");
var build_1 = require("./commands/build");
if (process.argv.length === 2) {
    console.error("No command argument");
    process.exit(1);
}
if (process.argv.length !== 3) {
    console.error("Too much arguments (" + (process.argv.length - 2) + " instead of 1)");
    process.exit(1);
}
var path = process.cwd();
switch (process.argv[2]) {
    case "start":
        start_1.Start(path);
        break;
    case "test":
        test_1.Test(path);
        break;
    case "build":
        build_1.Build(path);
        break;
    default:
        console.error("The command \"" + process.argv[2] + "\" does not exist");
        process.exit(1);
}
