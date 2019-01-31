"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_dom_1 = require("react-dom");
var Router_1 = __importDefault(require("./Router"));
var logger_1 = __importDefault(require("../logger"));
var App = (function () {
    function App(routes, stores) {
        if (routes === void 0) { routes = []; }
        if (stores === void 0) { stores = []; }
        this.router = new Router_1.default(this, routes);
        this.stores = stores;
        this.logger = new logger_1.default();
        var renderDiv = document.getElementById("render");
        react_dom_1.render(this.router.render(), renderDiv);
    }
    App.prototype.getLinkAction = function (name) {
        var _this = this;
        var route = this.router.getByName(name);
        return {
            path: route.path,
            call: function () { _this.router.history.push(route.path); },
        };
    };
    App.prototype.getStore = function (name) {
        return;
    };
    return App;
}());
exports.default = App;
