"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var logger_1 = __importDefault(require("./logger"));
var Client = (function () {
    function Client(router) {
        this.logger = new logger_1.default();
        this.router = router;
        var renderDiv = document.getElementById("render");
        react_dom_1.render(this.router.render(), renderDiv);
    }
    return Client;
}());
exports.default = Client;
