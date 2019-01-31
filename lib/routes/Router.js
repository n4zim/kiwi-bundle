"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var history_1 = require("history");
var Router = (function () {
    function Router(pages) {
        if (pages === void 0) { pages = []; }
        var _this = this;
        this.pages = [];
        this.history = history_1.createBrowserHistory();
        this.indexes = {};
        this.pages = pages;
        pages.forEach(function (page, index) {
            _this.indexes[page.name] = index;
        });
    }
    Router.prototype.getLinkAction = function (name) {
        var _this = this;
        var index = this.indexes[name];
        if (typeof index === "undefined") {
            throw "Page not found on cache";
        }
        var route = this.pages[index];
        if (typeof route === "undefined") {
            throw "Page not found on router";
        }
        return {
            path: route.path,
            call: function () { _this.history.push(route.path); },
        };
    };
    Router.prototype.render = function () {
        return React.createElement(react_router_dom_1.Router, { history: this.history },
            React.createElement(react_router_dom_1.Switch, null,
                this.pages.map(function (route) {
                    return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + route.name, path: route.path, component: route.component });
                }),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Router;
}());
exports.default = Router;
