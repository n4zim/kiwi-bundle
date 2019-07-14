"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Route = (function () {
    function Route(path, component, options) {
        if (options === void 0) { options = {}; }
        this.path = path;
        this.component = component;
        this.options = options;
    }
    return Route;
}());
exports.Route = Route;
