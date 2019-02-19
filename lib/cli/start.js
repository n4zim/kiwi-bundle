"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.default = (function (path) {
    var bundlePath = path_1.default.join(path, "node_modules", "kiwi-bundle");
    var binPath = path_1.default.join(path, "node_modules", ".bin", "webpack-dev-server");
    var configPath = path_1.default.join(bundlePath, "etc", "webpack", "development.js");
    process.argv[1] = binPath;
    process.argv[2] = "--context=" + bundlePath;
    process.argv[3] = "--config=" + configPath;
    process.argv[4] = "--hot";
    require(binPath);
});
