"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
exports.webpackConsoleLog = function (text) {
    console.log(chalk_1.default.blue("ℹ") + " " + chalk_1.default.gray("｢kwb｣") + ": " + text);
};
var parsePackageDependencies = function (fileData, callback) {
    var json = JSON.parse(fileData);
    if (typeof json.dependencies !== "undefined") {
        Object.keys(json.dependencies).forEach(callback);
    }
    if (typeof json.devDependencies !== "undefined") {
        Object.keys(json.devDependencies).forEach(callback);
    }
};
var createSymbolicLink = function (srcPath, distPath) {
    fs_1.default.exists(distPath, function (exists) {
        if (!exists) {
            fs_1.default.symlinkSync(srcPath, distPath);
        }
    });
};
exports.createModuleSymbolicLinks = function (rootPath) {
    return new Promise(function (resolve) {
        var baseModules = path_1.default.join(rootPath, "node_modules");
        var bundlePath = path_1.default.join(baseModules, "kiwi-bundle");
        var bundleModules = path_1.default.join(bundlePath, "node_modules");
        fs_1.default.exists(bundleModules, function (exists) {
            if (!exists)
                fs_1.default.mkdirSync(bundleModules);
            fs_1.default.readFile(path_1.default.join(bundlePath, "package.json"), "utf8", function (error, fileData) {
                if (error === null) {
                    parsePackageDependencies(fileData, function (dependency) {
                        createSymbolicLink(path_1.default.join(baseModules, dependency), path_1.default.join(bundleModules, dependency));
                    });
                }
            });
            resolve();
        });
    });
};
