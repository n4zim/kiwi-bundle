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
var regexParameter = function (prefix) { return new RegExp("(?:\\?|\\&)(?:" + prefix + ")([^=&]+)=([^&]*)", "g"); };
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
    Router.prototype.getParamsAsStrings = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        if (Array.isArray(prefix))
            prefix = prefix.join("|");
        var matches = window.location.href.match(regexParameter(prefix));
        if (matches === null)
            return [];
        return matches.map(function (match) { return match.slice(1); });
    };
    Router.prototype.getParamsAsArray = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        var params = [];
        var indexes = {};
        this.getParamsAsStrings(prefix).forEach(function (match) {
            var split = match.slice(prefix.length + 1).split("=");
            var field = split[0];
            var values = split[1].split("|");
            if (typeof indexes[field] === "undefined") {
                indexes[field] = params.length;
                params.push({ field: field, values: values });
            }
            else {
                params[indexes[field]].values = params[indexes[field]].values.concat(values);
            }
        });
        return params;
    };
    Router.prototype.getParamsAsObject = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        var params = {};
        this.getParamsAsStrings(prefix).forEach(function (match) {
            var split = match.slice(prefix.length + 1).split("=");
            var field = split[0];
            var values = split[1].split("|");
            if (typeof params[field] === "undefined")
                params[field] = [];
            params[field] = params[field].concat(values);
        });
        return params;
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
