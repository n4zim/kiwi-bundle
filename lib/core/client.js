"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var logger_1 = __importDefault(require("./logger"));
require("./sw");
var STARTED = false;
var Client = (function () {
    function Client(router) {
        var _this = this;
        this.hotModuleEnabled = typeof module.hot !== "undefined";
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
    return Client;
}());
exports.default = Client;
