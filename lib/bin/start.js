"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var path_1 = __importDefault(require("path"));
var webpack_1 = __importDefault(require("webpack"));
var config_1 = require("./config");
var config_2 = __importDefault(require("../webpack/config"));
var utils_1 = require("./utils");
var chalk_1 = __importDefault(require("chalk"));
var core_1 = require("../webpack/core");
exports.default = (function (path) {
    config_1.readConfig(path).then(function (kiwiConfig) {
        var outputPath = path_1.default.resolve(path, kiwiConfig.platforms.web.buildDir);
        var webpackConfig = config_2.default(path, outputPath, kiwiConfig, core_1.WebpackMode.DEVELOPMENT);
        var server = new webpack_dev_server_1.default(webpack_1.default(webpackConfig), webpackConfig.devServer);
        utils_1.webpackConsoleLog("Webpack launched for a watched development build...");
        server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host, function () {
            utils_1.webpackConsoleLog("Development server will ba available at " +
                chalk_1.default.bold("http://" + webpackConfig.devServer.host + ":" + webpackConfig.devServer.port));
        });
    });
});
