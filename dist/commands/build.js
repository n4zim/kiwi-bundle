"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var context_1 = require("../core/context");
var dropin_recipes_1 = require("dropin-recipes");
var tsc_1 = require("../core/tsc");
var clearDirectory = function (dir) {
    fs_1.readdirSync(dir).forEach(function (element) {
        var path = path_1.join(dir, element);
        if (fs_1.lstatSync(path).isDirectory()) {
            clearDirectory(path);
        }
        else {
            fs_1.unlinkSync(path);
        }
    });
};
exports.Build = function (path) {
    var context = new context_1.KiwiBundleContext(path, dropin_recipes_1.Environment.PRODUCTION);
    context.display();
    clearDirectory(path_1.join(context.path, context.compilerOptions.outDir));
    tsc_1.TypeScriptComplier.build(context);
};
