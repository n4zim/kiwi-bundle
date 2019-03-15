"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var awesome_typescript_loader_1 = require("awesome-typescript-loader");
var stylelint_webpack_plugin_1 = __importDefault(require("stylelint-webpack-plugin"));
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var app_manifest_webpack_plugin_1 = __importDefault(require("app-manifest-webpack-plugin"));
var webpack_1 = __importDefault(require("webpack"));
var core_1 = __importDefault(require("./core"));
var etag_1 = __importDefault(require("etag"));
var generateIconsAndManifest = function (kiwiConfig, path, dev) {
    return new app_manifest_webpack_plugin_1.default({
        logo: path_1.default.join(path, "assets", "logo.png"),
        prefix: "/static/icons/",
        output: "static/icons/",
        persistentCache: dev,
        inject: true,
        config: {
            appName: kiwiConfig.project.title,
            appDescription: kiwiConfig.project.description,
            lang: kiwiConfig.project.lang,
            developerName: kiwiConfig.project.author,
            display: "standalone",
            orientation: "portrait",
            start_url: "/?homescreen=1",
            icons: {
                favicons: true,
                android: !dev,
                appleIcon: !dev,
                appleStartup: !dev,
                firefox: !dev,
                twitter: !dev,
                windows: !dev,
                yandex: false,
                coast: false,
                opengraph: false,
            },
        }
    });
};
var generateKiwiJson = function (buildDir) { return ({
    apply: function (compiler) {
        compiler.hooks.emit.tap("kiwi-json", function (compilation) {
            var json = {};
            Object.keys(compilation.assets).forEach(function (assetPath) {
                if (!/^.cache|(sw.[a-z0-9]+.js)|(.*.hot-update.js(on)?)$/.test(assetPath)) {
                    var key = "/" + (assetPath === "index.html" ? "" : assetPath);
                    json[key] = etag_1.default(compilation.assets[assetPath].source());
                }
            });
            json = JSON.stringify(json);
            compilation.assets["static/kiwi.json"] = {
                source: function () { return json; },
                size: function () { return json.length; },
            };
        });
    },
}); };
var plugins = function (path, bundlePath, kiwiConfig) { return new core_1.default({
    common: function () { return [
        new awesome_typescript_loader_1.CheckerPlugin(),
        new stylelint_webpack_plugin_1.default(),
        new html_webpack_plugin_1.default({
            template: path_1.default.join(bundlePath, "opt", "index.html.ejs"),
            lang: kiwiConfig.project.lang,
            title: kiwiConfig.project.title,
            description: kiwiConfig.project.description,
            generatekiwiConfig: function (webpack) {
                var config = {};
                if (Array.isArray(webpack.assetsByChunkName.sw)) {
                    config.sw = webpack.assetsByChunkName.sw[0];
                }
                else {
                    config.sw = webpack.assetsByChunkName.sw;
                }
                return "<script>window.kiwi=" + JSON.stringify(config) + "</script>";
            },
            excludeChunks: ["sw"],
            minify: {
                preserveLineBreaks: true,
                collapseWhitespace: true,
            },
        }),
    ]; },
    development: function () { return [
        new webpack_1.default.HotModuleReplacementPlugin(),
        generateIconsAndManifest(kiwiConfig, path, true),
        generateKiwiJson(kiwiConfig.platforms.web.buildDir),
    ]; },
    production: function () { return [
        generateIconsAndManifest(kiwiConfig, path, false),
        generateKiwiJson(kiwiConfig.platforms.web.buildDir),
    ]; },
}); };
exports.default = plugins;
