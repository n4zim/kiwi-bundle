"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yamljs_1 = require("yamljs");
var start = function (path, config) {
    var bundlePath = path_1.default.join(path, "node_modules", "kiwi-bundle");
    var binPath = path_1.default.join(bundlePath, "node_modules", ".bin", "webpack-dev-server");
    var configPath = path_1.default.join(bundlePath, "etc", "webpack", "development.js");
    process.argv[1] = binPath;
    process.argv[2] = "--context=" + bundlePath;
    process.argv[3] = "--config=" + configPath;
    process.argv[4] = "--hot";
    require(binPath);
};
exports.default = (function (path) {
    fs_1.default.readFile(path_1.default.join(path, "kiwi.yml"), function (error, data) {
        if (!error) {
            start(path, yamljs_1.parse(data.toString("utf-8")));
        }
    });
});
