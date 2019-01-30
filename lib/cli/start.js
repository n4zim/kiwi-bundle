"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yamljs_1 = require("yamljs");
var child_process_1 = require("child_process");
var start = function (path, config) {
    var binPath = path_1.default.join(path, "node_modules", ".bin", "webpack-dev-server");
    var configPath = path_1.default.join(path, "node_modules", "kiwi-bundle", "etc", "webpack", "development.js");
    var env = Object.create(process.env);
    env.DEV_PORT = config.platforms.web.dev.port;
    var command = child_process_1.spawn(binPath, ["--context=" + path, "--config=" + configPath], { env: env });
    command.stdout.on('data', function (data) {
        process.stdout.write(data);
    });
    command.stderr.on('data', function (data) {
        console.error(data.toString());
        process.stderr.write(data);
    });
};
exports.default = (function (path) {
    fs_1.default.readFile(path_1.default.join(path, "kiwi.yml"), function (error, data) {
        if (!error) {
            start(path, yamljs_1.parse(data.toString('utf-8')));
        }
    });
});
