"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var packageJson = require('../../package.json');
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
var Config = /** @class */ (function () {
    function Config(json) {
        if (typeof json === 'undefined') {
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
