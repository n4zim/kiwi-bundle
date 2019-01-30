"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = (function () {
    function Route(name, path, component, title) {
        this.name = name;
        this.path = path;
        this.component = component;
        this.title = title;
    }
    return Route;
}());
exports.default = Route;
