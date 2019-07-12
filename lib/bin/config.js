"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var yamljs_1 = require("yamljs");
var packageJson = require("../../package.json");
var Platform;
(function (Platform) {
    Platform["WEB"] = "web";
    Platform["ANDROID"] = "android";
    Platform["IOS"] = "ios";
    Platform["LINUX"] = "linux";
    Platform["WINDOWS"] = "windows";
    Platform["MACOS"] = "macos";
})(Platform || (Platform = {}));
exports.Platform = Platform;
var Config = (function () {
    function Config(json) {
        if (typeof json === "undefined") {
            this.version = packageJson.version;
            this.platforms = [Platform.WEB];
        }
        else {
            this.version = json.version;
            this.platforms = json.platforms;
        }
    }
    Config.prototype.write = function (projectDir) {
        console.log(projectDir, JSON.stringify(this));
    };
    return Config;
}());
exports.default = Config;
var readConfig = function (path) { return new Promise(function (resolve, reject) {
    fs_1.default.readFile(path_1.default.join(path, "kiwi.yml"), function (error, data) {
        if (error) {
            reject(null);
        }
        else {
            resolve(yamljs_1.parse(data.toString("utf-8")));
        }
    });
}); };
exports.readConfig = readConfig;
