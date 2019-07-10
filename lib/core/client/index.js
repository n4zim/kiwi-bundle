"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var logger_1 = __importDefault(require("./logger"));
var ExecuteString_1 = __importDefault(require("../i18n/ExecuteString"));
require("./sw");
var STARTED = false;
var Client = (function () {
    function Client(router) {
        var _this = this;
        this.hotModuleEnabled = typeof module.hot !== "undefined";
        this.language = navigator.language.slice(0, 2);
        react_dom_1.render(router.render(), document.getElementById("render"), function () {
            logger_1.default.logSuccess(_this, STARTED ? "Restarted" : "Started");
            STARTED = true;
        });
        if (this.hotModuleEnabled) {
            this.loadHotModule();
        }
    }
    Client.prototype.loadHotModule = function () {
        var moduleCacheChildren = require.cache[0].children;
        var clientModuleName = moduleCacheChildren[moduleCacheChildren.length - 1];
        var clientModule = require.cache[clientModuleName];
        if (typeof clientModule.hot !== "undefined") {
            clientModule.hot.accept();
            logger_1.default.logInfo("Hot", "Listening");
        }
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", "/");
        httpRequest.send();
    };
    Client.prototype.i18n = function (data, count, vars) {
        if (count === void 0) { count = 1; }
        if (vars === void 0) { vars = {}; }
        if (typeof data === "string")
            return data;
        if (typeof data === "object")
            return ExecuteString_1.default(data);
        if (typeof data === "function")
            return data(this.language, count);
        logger_1.default.logError("i18n", "Unknown i18n data type");
        return "";
    };
    return Client;
}());
exports.default = Client;
