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
    Router.prototype.redirect = function (path) {
        HISTORY.push(path);
    };
    Router.prototype.getLinkAction = function (path) {
        var _this = this;
        return { path: path, call: function () { _this.redirect(path); } };
    };
    Router.prototype.getReactRouterRoutes = function () {
        return this.routes.map(function (route, index) {
            return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + index, path: route.path, component: route.component });
        });
    };
    Router.prototype.render = function () {
        return React.createElement(react_router_dom_1.Router, { history: HISTORY },
            React.createElement(react_router_dom_1.Switch, null,
                this.getReactRouterRoutes(),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Router;
}());
exports.default = Router;
