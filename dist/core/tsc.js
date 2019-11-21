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
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = require("fs");
var TypeScriptComplier = /** @class */ (function () {
    function TypeScriptComplier() {
    }
    TypeScriptComplier.reportDiagnostic = function (diagnostic) {
        console.error("[ERROR] error " + diagnostic.code, typeof diagnostic.file !== "undefined"
            ? " - ./" + path_1.relative(TypeScriptComplier.formatHost.getCurrentDirectory(), diagnostic.file.fileName)
            : "", TypeScriptComplier.formatHost.getNewLine(), chalk_1.default.red(tsc.flattenDiagnosticMessageText(diagnostic.messageText, TypeScriptComplier.formatHost.getNewLine())), TypeScriptComplier.formatHost.getNewLine());
    };
    TypeScriptComplier.fsGetAllFiles = function (dir) {
        return fs_1.readdirSync(dir).reduce(function (list, element) {
            var elementPath = path_1.join(dir, element);
            var elementStat = fs_1.statSync(elementPath);
            if (elementStat.isDirectory()) {
                list.unshift.apply(list, TypeScriptComplier.fsGetAllFiles(elementPath));
            }
            else if (elementStat.isFile()) {
                var elementExtension = path_1.extname(element);
                if (elementExtension === ".ts" || elementExtension === ".tsx") {
                    list.unshift(elementPath);
                }
            }
            return list;
        }, []);
    };
    TypeScriptComplier.fsChmodBinaries = function (context) {
        if (typeof context.package.bin !== "undefined") {
            Object.values(context.package.bin).forEach(function (binPath) {
                fs_1.chmodSync(path_1.join(context.path, binPath), "755");
            });
        }
    };
    TypeScriptComplier.build = function (context) {
        var files = TypeScriptComplier.fsGetAllFiles(path_1.join(context.path, context.compilerOptions.rootDir));
        console.log("Files to compile :\n" + files.map(function (file) { return "- ./" + path_1.relative(context.path, file); }).join("\n") + "\n");
        var program = tsc.createProgram(files, context.compilerOptions);
        var emitResult = program.emit();
        var allDiagnostics = tsc.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
        allDiagnostics.forEach(TypeScriptComplier.reportDiagnostic);
        if (emitResult.emitSkipped) {
            process.exit(1);
        }
        else {
            TypeScriptComplier.fsChmodBinaries(context);
            process.exit(0);
        }
    };
    TypeScriptComplier.reportWatchStatusChanged = function (diagnostic) {
        var tag = "[STATUS]";
        switch (diagnostic.code) {
            case 6031:
            case 6032:
                tag = chalk_1.default.bgYellowBright(chalk_1.default.black(" WORKING "));
                break;
            case 6193:
                tag = chalk_1.default.bgRedBright(chalk_1.default.black(" ERRORS "));
                break;
            case 6194:
                tag = chalk_1.default.bgGreenBright(chalk_1.default.black(" READY "));
                break;
        }
        console.info(tag, tsc.formatDiagnostic(diagnostic, TypeScriptComplier.formatHost));
    };
    TypeScriptComplier.watch = function (context) {
        var configPath = tsc.findConfigFile(context.path, tsc.sys.fileExists, "tsconfig.json");
        if (typeof configPath !== "undefined") {
            var createProgram = tsc.createSemanticDiagnosticsBuilderProgram;
            var host = tsc.createWatchCompilerHost(configPath, {}, tsc.sys, createProgram, TypeScriptComplier.reportDiagnostic, TypeScriptComplier.reportWatchStatusChanged);
            var origCreateProgram_1 = host.createProgram;
            host.createProgram = function (rootNames, options, host, oldProgram) { return origCreateProgram_1(rootNames, options, host, oldProgram); };
            var origPostProgramCreate_1 = host.afterProgramCreate;
            host.afterProgramCreate = function (program) {
                origPostProgramCreate_1(program);
                TypeScriptComplier.fsChmodBinaries(context);
            };
            tsc.createWatchProgram(host);
        }
    };
    TypeScriptComplier.formatHost = {
        getCanonicalFileName: function (path) { return path; },
        getCurrentDirectory: tsc.sys.getCurrentDirectory,
        getNewLine: function () { return tsc.sys.newLine; },
    };
    return TypeScriptComplier;
}());
exports.TypeScriptComplier = TypeScriptComplier;
