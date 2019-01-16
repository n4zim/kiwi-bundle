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
    Platform["MAC"] = "mac";
})(Platform || (Platform = {}));
var Config = /** @class */ (function () {
    function Config(json) {
        if (typeof json === 'undefined') {
            this.version = packageJson.version;
            this.platforms = packageJson.platforms;
        }
        else {
            this.version = json.version;
            this.platforms = [Platform.WEB];
        }
    }
    return Config;
}());
