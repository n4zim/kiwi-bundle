"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsc = __importStar(require("typescript"));
var context_1 = require("./context");
module.exports = {
    process: (src, path) => {
        const ts = path.endsWith(".ts");
        const tsx = path.endsWith(".tsx");
        if (ts || tsx) {
            const context = new context_1.KiwiBundleContext(process.env.PWD);
            src = tsc.transpileModule(src, {
                compilerOptions: context.compilerOptions,
                fileName: path
            }).outputText;
            path = path.substr(0, path.lastIndexOf(".")) + (ts ? ".js" : ".jsx") || path;
        }
        return src;
    }
};
