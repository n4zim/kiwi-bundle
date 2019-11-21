"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../core/context");
var tsc_1 = require("../core/tsc");
exports.Start = function (path) {
    var context = new context_1.KiwiBundleContext(path);
    context.display();
    tsc_1.TypeScriptComplier.watch(context);
};
