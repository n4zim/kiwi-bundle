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
var history_1 = require("history");
var react_router_dom_1 = require("react-router-dom");
var HISTORY = history_1.createBrowserHistory();
var Router = (function () {
    function Router(routes) {
        if (routes === void 0) { routes = []; }
        this.routes = [];
        this.indexes = {};
        this.routes = routes;
    }
    Router.prototype.getLinkAction = function (path) {
        return {
            path: path,
            call: function () {
                window.location.hash = path;
            }
        };
    };
    Router.prototype.getReactRoutes = function () {
        return this.routes.map(function (route, index) {
            return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + index, path: route.path, component: route.component });
        });
    };
    Router.prototype.render = function () {
        return React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement(react_router_dom_1.Switch, null,
                this.getReactRoutes(),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Router;
}());
exports.default = Router;
