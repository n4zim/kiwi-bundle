#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var start_1 = __importDefault(require("./start"));
var build_1 = __importDefault(require("./build"));
var error = function (message) {
    console.error(chalk_1.default.red("[ERROR] " + message));
    process.exit(1);
};
if (process.argv.length === 2) {
    error("No command argument");
}
if (process.argv.length !== 3) {
    error("Too much arguments (" + (process.argv.length - 2) + " instead of 1)");
}
var path = process.cwd();
switch (process.argv[2]) {
    case "start":
        start_1.default(path);
        break;
    case "build":
        build_1.default(path);
        break;
    default:
        error("The command \"" + process.argv[2] + "\" does not exist");
}
