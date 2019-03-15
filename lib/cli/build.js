"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var path_1 = __importDefault(require("path"));
var rimraf_1 = __importDefault(require("rimraf"));
var utils_1 = require("./utils");
var webpack_1 = __importDefault(require("webpack"));
var config_2 = __importDefault(require("../webpack/config"));
var core_1 = require("../webpack/core");
exports.default = (function (path) {
    config_1.readConfig(path).then(function (kiwiConfig) {
        var outputPath = path_1.default.resolve(path, kiwiConfig.platforms.web.buildDir);
        rimraf_1.default(outputPath, function (error) {
            if (error) {
                console.error(error);
            }
            else {
                utils_1.webpackConsoleLog("Webpack launched for production build...");
                webpack_1.default(config_2.default(path, outputPath, kiwiConfig, core_1.WebpackMode.PRODUCTION), function (err, stats) {
                    if (err) {
                        console.error("Webpack error :", err);
                    }
                    else {
                        console.log(stats.toString({ colors: true }));
                    }
                });
            }
        });
    });
});
