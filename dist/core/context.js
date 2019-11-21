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
var tsc = __importStar(require("typescript"));
var path_1 = require("path");
var fs_1 = require("fs");
var dropin_recipes_1 = require("dropin-recipes");
var chalk_1 = __importDefault(require("chalk"));
var ModuleKinds = {
    none: tsc.ModuleKind.None,
    commonjs: tsc.ModuleKind.CommonJS,
    amd: tsc.ModuleKind.AMD,
    system: tsc.ModuleKind.System,
    umd: tsc.ModuleKind.UMD,
    es6: tsc.ModuleKind.ES2015,
    es2015: tsc.ModuleKind.ES2015,
    esnext: tsc.ModuleKind.ESNext
};
var ScriptTargets = {
    es3: tsc.ScriptTarget.ES3,
    es5: tsc.ScriptTarget.ES5,
    es2015: tsc.ScriptTarget.ES2015,
    es2016: tsc.ScriptTarget.ES2016,
    es2017: tsc.ScriptTarget.ES2017,
    es2018: tsc.ScriptTarget.ES2018,
    es2019: tsc.ScriptTarget.ES2019,
    es2020: tsc.ScriptTarget.ES2020,
    esnext: tsc.ScriptTarget.ESNext,
};
var KiwiBundleContext = /** @class */ (function () {
    function KiwiBundleContext(path, env) {
        if (env === void 0) { env = dropin_recipes_1.Environment.PRODUCTION; }
        this.bundles = {};
        this.path = path;
        this.env = env;
        this.load();
    }
    KiwiBundleContext.prototype.load = function () {
        var packageJsonPath = path_1.join(this.path, "package.json");
        var bundlePath = path_1.join(this.path, "node_modules", "kiwi-bundle");
        var bundleJsonPath = path_1.join(bundlePath, "package.json");
        if (fs_1.existsSync(packageJsonPath) && fs_1.existsSync(bundleJsonPath)) {
            this.package = JSON.parse(fs_1.readFileSync(packageJsonPath, "utf8"));
            this.bundles.core = JSON.parse(fs_1.readFileSync(bundleJsonPath, "utf8"));
        }
        var tsConfigPath = path_1.join(this.path, "tsconfig.json");
        if (fs_1.existsSync(tsConfigPath)) {
            var tsConfig = JSON.parse(fs_1.readFileSync(tsConfigPath, "utf8"));
            if (typeof tsConfig.extends !== "undefined") {
                var extendsConfig = JSON.parse(fs_1.readFileSync(path_1.join(this.path, tsConfig.extends), "utf8"));
                if (typeof tsConfig.compilerOptions !== "undefined") {
                    this.compilerOptions = Object.assign(extendsConfig.compilerOptions, tsConfig.compilerOptions);
                }
                else {
                    this.compilerOptions = extendsConfig.compilerOptions;
                }
            }
            if (typeof this.compilerOptions.module === "string") {
                this.compilerOptions.module = ModuleKinds[this.compilerOptions.module];
            }
            if (typeof this.compilerOptions.target === "string") {
                this.compilerOptions.target = ScriptTargets[this.compilerOptions.target];
            }
            if (typeof this.compilerOptions.lib === "object") {
                this.compilerOptions.lib = this.compilerOptions.lib.map(function (lib) { return "lib." + lib + ".d.ts"; });
            }
        }
    };
    KiwiBundleContext.prototype.display = function () {
        console.log(chalk_1.default.green(" _____ _       _    _____           _ _"));
        console.log(chalk_1.default.green("|  |  |_|_ _ _|_|  | __  |_ _ ___ _| | |___"));
        console.log(chalk_1.default.green("|    -| | | | | |  | __ -| | |   | . | | -_|"));
        console.log(chalk_1.default.green("|__|__|_|_____|_|  |_____|___|_|_|___|_|___|\n"));
        if (this.env === dropin_recipes_1.Environment.PRODUCTION) {
            console.log("============ [PRODUCTION MODE] =============");
        }
        else {
            console.log("============ [DEVELOPMENT MODE] ============");
        }
        console.log("Current package :", this.package.name);
        console.log("Current version :", this.package.version);
        console.log("Bundle version  :", this.bundles.core.version);
        console.log("============================================\n");
    };
    return KiwiBundleContext;
}());
exports.KiwiBundleContext = KiwiBundleContext;
