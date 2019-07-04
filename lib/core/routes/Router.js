"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var history_1 = require("history");
var react_router_dom_1 = require("react-router-dom");
var Redirect_1 = __importDefault(require("./Redirect"));
var HISTORY = history_1.createBrowserHistory();
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
    Router.prototype.getParamsAsString = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        if (Array.isArray(prefix))
            prefix = prefix.join("|");
        var matches = window.location.href.match(regexParameter(prefix));
        if (matches === null)
            return [];
        return matches.map(function (match) { return match.slice(1); });
    };
    Router.prototype.getParametersAsObject = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        var params = {};
        this.getParamsAsString(prefix).forEach(function (match) {
            var split = match.slice(prefix.length).split("=");
            var key = split[0];
            var values = split[1].split("|");
            if (typeof params[key] === "undefined")
                params[key] = [];
            params[key] = params[key].concat(values);
        });
        return params;
    };
    Router.prototype.getParametersAsArray = function (prefix) {
        if (prefix === void 0) { prefix = ""; }
        var params = [];
        var indexes = {};
        this.getParamsAsString(prefix).forEach(function (match) {
            var split = match.slice(prefix.length).split("=");
            var key = split[0];
            var values = split[1].split("|");
            if (typeof indexes[key] === "undefined") {
                indexes[key] = params.length;
                params.push({ key: key, values: values });
            }
            else {
                params[indexes[key]].values = params[indexes[key]].values.concat(values);
            }
        });
        return params;
    };
    Router.prototype.getReactRoutes = function () {
        return this.routes.map(function (route, index) {
            if (route instanceof Redirect_1.default) {
                return React.createElement(react_router_dom_1.Redirect, { exact: true, key: "route" + index, to: route.path });
            }
            return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + index, path: route.path, component: route.component });
        });
    };
    Router.prototype.render = function () {
        return React.createElement(react_router_dom_1.Router, { history: HISTORY },
            React.createElement(react_router_dom_1.Switch, null,
                this.getReactRoutes(),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Router;
}());
exports.default = Router;
