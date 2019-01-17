"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Component = /** @class */ (function () {
    function Component() {
    }
    return Component;
}()); // A remplacer avec React
// -----------------------------------------------
var Route = /** @class */ (function () {
    function Route(name, path, component) {
        this.name = name;
        this.path = path;
        this.component = component;
    }
    return Route;
}());
exports.Route = Route;
var Router = /** @class */ (function () {
    function Router(routes) {
        if (routes === void 0) { routes = []; }
        this.routes = routes;
    }
    return Router;
}());
exports.default = Router;
