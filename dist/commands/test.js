"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../core/context");
var jest_1 = __importDefault(require("jest"));
exports.Test = function (path) {
    var context = new context_1.KiwiBundleContext(path);
    context.display();
    var options = {
        projects: [context.compilerOptions.rootDir],
        rootDir: context.path,
        roots: ["<rootDir>/" + context.compilerOptions.rootDir],
        moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
        transform: JSON.stringify({
            "^.+\\.(ts|tsx)$": "<rootDir>/" + context.compilerOptions.outDir + "/core/jest.js",
        }),
        transformIgnorePatterns: ["/node_modules/"],
        moduleDirectories: ["node_modules"],
        testRegex: "\\.test\\.(?:ts|tsx)$",
        globals: JSON.stringify({
            "DEVELOPMENT": false,
            "FAKE_SERVER": false,
        }),
    };
    jest_1.default.runCLI(options, options.projects);
};
