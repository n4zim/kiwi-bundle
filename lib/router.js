"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var components_1 = require("./components");
var Route = (function () {
    function Route(name, path, component) {
        this.name = name;
        this.path = path;
        this.component = component;
    }
    return Route;
}());
exports.Route = Route;
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
    Router.prototype.render = function () {
        var _this = this;
        return React.createElement(react_router_dom_1.Router, { history: this.history },
            React.createElement(react_router_dom_1.Switch, null,
                this.routes.map(function (route) {
                    return React.createElement(react_router_dom_1.Route, { exact: true, key: "route" + route.name, path: route.path, render: function () {
                            return new route.component(_this.app).render();
                        } });
                }),
                React.createElement(react_router_dom_1.Redirect, { from: "*", to: "/" })));
    };
    return Router;
}());
exports.default = Router;
var Link = (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.prototype.onClick = function () {
        console.log(this.props.route);
    };
    Link.prototype.render = function () {
        return React.createElement("a", { href: "#", onClick: this.onClick.bind(this) }, this.props.children);
    };
    return Link;
}(components_1.WebComponent));
exports.Link = Link;
