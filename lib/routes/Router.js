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
    function Router(app, routes) {
        if (routes === void 0) { routes = []; }
        var _this = this;
        this.routes = [];
        this.history = history_1.createBrowserHistory();
        this.paths = {};
        this.app = app;
        this.routes = routes;
        routes.forEach(function (route) {
            _this.paths[route.name] = route.path;
        });
    }
    Router.prototype.injectKiwi = function (component, props) {
        return new component(this.app, props).render();
    };
    Router.prototype.render = function () {
        var _this = this;
        return React.createElement(react_router_dom_1.Router, { history: this.history },
            React.createElement(react_router_dom_1.Switch, null,
                this.routes.map(function (route) {
                    return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + route.name, path: route.path, render: function (props) { return _this.injectKiwi(route.component, props); } });
                }),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Router;
}());
exports.default = Router;
