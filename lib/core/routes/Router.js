"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var Redirect_1 = require("./Redirect");
var HISTORY = history_1.createBrowserHistory();
var regexParameter = function (prefix) {
    if (prefix === void 0) { prefix = ""; }
    return new RegExp("(\\?|\\&)(" + prefix + ")([^=&]*)=([^&]*)", "g");
};
var Router = (function () {
    function Router(routes, options) {
        if (routes === void 0) { routes = []; }
        if (options === void 0) { options = {}; }
        this.routes = [];
        this.indexes = {};
        this.routes = routes;
        this.options = options;
    }
    Router.prototype.getLinkAction = function (path) {
        return {
            path: path,
            call: function () {
                HISTORY.push(path);
            }
        };
    };
    Router.prototype.getParamsAsString = function (prefix) {
        if (Array.isArray(prefix))
            prefix = prefix.join("|");
        var matches = window.location.href.match(regexParameter(prefix));
        if (matches === null)
            return [];
        return matches.map(function (match) { return match.slice(1); });
    };
    Router.prototype.getParametersAsObject = function (prefix) {
        var params = {};
        this.getParamsAsString(prefix).forEach(function (match) {
            var split = match.split(/=(.+)/);
            var key = split[0];
            var values = split[1].split("|");
            if (typeof params[key] === "undefined")
                params[key] = [];
            params[key] = params[key].concat(values);
        });
        return params;
    };
    Router.prototype.getParametersAsArray = function (prefix) {
        var params = [];
        var indexes = {};
        this.getParamsAsString(prefix).forEach(function (match) {
            var split = match.split(/=(.+)/);
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
        var _this = this;
        return this.routes.map(function (route, index) {
            if (route instanceof Redirect_1.Redirect) {
                return React.createElement(react_router_dom_1.Redirect, { exact: true, key: "route" + index, to: route.path });
            }
            return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + index, path: route.path, render: function (props) {
                    if (_this.options.routeAuthentifier
                        && !_this.options.routeAuthentifier.currentUserHasAccessToRoute(route)) {
                        return React.createElement(react_router_dom_1.Redirect, { exact: true, key: "route" + index, to: {
                                pathname: _this.options.routeAuthentifier.unauthRedirectPathForRoute(route),
                                state: { unauthRedirect: true },
                            } });
                    }
                    return React.createElement(route.component, __assign({}, props));
                } });
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
exports.Router = Router;
