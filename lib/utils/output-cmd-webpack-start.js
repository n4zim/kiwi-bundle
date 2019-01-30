"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var projectPath = process.argv[2];
var binPath = path_1.default.join(projectPath, "node_modules", ".bin", "webpack-dev-server");
var configPath = path_1.default.join(projectPath, "node_modules", "kiwi-bundle", "etc", "webpack", "development.js");
console.log(binPath + " --context=" + projectPath + " --config=" + configPath);
