"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var Client = (function () {
    function Client(params) {
        this.router = params.router;
        this.logger = params.logger;
        var renderDiv = document.getElementById("render");
        react_dom_1.render(this.router.render(), renderDiv);
    }
    return Client;
}());
exports.default = Client;
