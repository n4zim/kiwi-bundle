"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var defaultParams = {
    enable: true,
};
var typeCss = function (color) { return [
    "border: 1px solid black",
    "padding: 2px 10px",
    "background-color: " + color,
    "color: white",
    "font-size: 13px",
].join(";"); };
var TYPES;
(function (TYPES) {
    TYPES["SUCCESS"] = "SUCCESS";
    TYPES["ERROR"] = " ERROR ";
    TYPES["INFO"] = "  INFO ";
})(TYPES || (TYPES = {}));
var TYPES_COLORS = (_a = {},
    _a[TYPES.SUCCESS] = "#7eae0c",
    _a[TYPES.ERROR] = "#a71c0d",
    _a[TYPES.INFO] = "#0f4ba6",
    _a);
var Logger = (function () {
    function Logger(params) {
        if (params === void 0) { params = defaultParams; }
        this.enabled = params.enable;
        if (this.enabled) {
        }
    }
    Logger.prototype.log = function (data, type) {
        var log = [];
        if (typeof type !== "undefined") {
            log.push("%c" + type, typeCss(TYPES_COLORS[type]));
        }
        console.log.apply(console, log.concat([data]));
    };
    Logger.prototype.logSuccess = function (data) {
        this.log(data, TYPES.SUCCESS);
    };
    Logger.prototype.logError = function (data) {
        this.log(data, TYPES.ERROR);
    };
    Logger.prototype.logInfo = function (data) {
        this.log(data, TYPES.INFO);
    };
    return Logger;
}());
exports.default = Logger;
