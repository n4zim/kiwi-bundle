"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import React from "react"
var react_dom_1 = require("react-dom");
var router_1 = __importDefault(require("./router"));
var logger_1 = __importDefault(require("./logger"));
var App = /** @class */ (function () {
    function App(routes) {
        if (routes === void 0) { routes = []; }
        this.router = new router_1.default(routes);
        this.logger = new logger_1.default();
        var renderDiv = document.getElementById("render");
        react_dom_1.render(this.router.render(), renderDiv);
    }
    return App;
}());
exports.default = App;
