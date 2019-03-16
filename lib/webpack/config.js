"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var core_1 = require("./core");
var config_rules_1 = __importDefault(require("./config.rules"));
var config_plugins_1 = __importDefault(require("./config.plugins"));
var generateJsOutputPath = function (mode, data) {
    var isSw = typeof data !== "undefined" && data.chunk.name === "sw";
    var isProd = mode === core_1.WebpackMode.PRODUCTION;
    return (isSw ? "" : "static/") + "[name]." + (isProd ? "[contenthash].min" : "[hash]") + ".js";
};
exports.default = (function (rootPath, outputPath, kiwiConfig, mode) {
    var bundlePath = path_1.default.join(rootPath, "node_modules", "kiwi-bundle");
    var config = {
        mode: mode,
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [
                path_1.default.join(rootPath, "node_modules"),
            ],
            alias: {
                "kiwi-bundle": bundlePath,
            },
        },
        resolveLoader: {
            extensions: [".ts", ".tsx", ".js"],
            modules: [
                path_1.default.join(rootPath, "node_modules"),
            ],
        },
        entry: {
            main: [path_1.default.join(rootPath, "src", "client", "index.ts")],
            sw: path_1.default.join(bundlePath, "src", "sw", "index.ts"),
        },
        output: {
            filename: function (data) { return generateJsOutputPath(mode, data); },
            chunkFilename: generateJsOutputPath(mode),
            publicPath: "/",
            path: outputPath,
        },
        module: {
            rules: config_rules_1.default.generate(mode),
        },
        plugins: config_plugins_1.default(rootPath, bundlePath, kiwiConfig).generate(mode),
        devtool: mode === core_1.WebpackMode.PRODUCTION ? "source-map" : "eval",
        performance: {
            hints: false,
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                    },
                },
            },
        },
    };
    if (mode === core_1.WebpackMode.DEVELOPMENT) {
        config.entry.main.unshift("webpack/hot/only-dev-server");
        config.entry.main.unshift("webpack-dev-server/client"
            + ("?http://" + kiwiConfig.platforms.web.devHost + ":" + kiwiConfig.platforms.web.devPort));
        config.devServer = {
            host: kiwiConfig.platforms.web.devHost,
            port: kiwiConfig.platforms.web.devPort,
            historyApiFallback: true,
            clientLogLevel: "warning",
            inline: true,
            progress: true,
            hot: true,
        };
        config.output.globalObject = "(typeof self !== 'undefined' ? self : this)";
    }
    return config;
});
