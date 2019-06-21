"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("../webpack/core");
var generateCss = function (color) { return [
    "padding: 2px 10px",
    "background-color: " + color,
    "font-size: 12px",
].join(";"); };
var Logger = (function () {
    function Logger() {
        this.enabled = false;
        this.previous = null;
        if (process.env.NODE_ENV !== core_1.WebpackMode.PRODUCTION) {
            this.enabled = true;
        }
    }
    Logger.prototype.disable = function () {
        if (this.enabled) {
            this.enabled = false;
            this.logInfo(this, "Disabled");
        }
        else {
            this.logError(this, "Already disabled");
        }
    };
    Logger.prototype.dateToText = function (date) {
        return date.getFullYear()
            + " " + date.getMonth()
            + " " + date.getDate()
            + " " + date.getHours()
            + " " + date.getMinutes()
            + " " + date.getSeconds()
            + " " + date.getMilliseconds();
    };
    Logger.prototype.log = function (context, color, title) {
        var data = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            data[_i - 3] = arguments[_i];
        }
        if (this.enabled) {
            var isObject = typeof context !== "string";
            var label = "%c" + (isObject ? context.constructor.name : context);
            var css = generateCss(color);
            console.groupCollapsed(label, css, title);
            var now = new Date();
            var contextData = {
                time: this.dateToText(now),
            };
            if (this.previous !== null) {
                contextData.time += " (" + (now.getTime() - this.previous.getTime()) + " ms from prev.)";
            }
            this.previous = now;
            if (isObject) {
                contextData.instance = context;
            }
            console.log("\\_> Context", contextData);
            data.forEach(function (element) {
                console.log(element);
            });
            console.groupEnd();
        }
    };
    Logger.prototype.logSuccess = function (context, title) {
        var data = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            data[_i - 2] = arguments[_i];
        }
        this.log.apply(this, [context, "#a4f6a5", title].concat(data));
    };
    Logger.prototype.logError = function (context, title) {
        var data = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            data[_i - 2] = arguments[_i];
        }
        this.log.apply(this, [context, "#f68787", title].concat(data));
    };
    Logger.prototype.logInfo = function (context, title) {
        var data = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            data[_i - 2] = arguments[_i];
        }
        this.log.apply(this, [context, "#f1eb9a", title].concat(data));
    };
    Logger.prototype.logView = function (context, title) {
        var data = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            data[_i - 2] = arguments[_i];
        }
        this.log.apply(this, [context, "#f8a978", title].concat(data));
    };
    return Logger;
}());
exports.default = new Logger();
