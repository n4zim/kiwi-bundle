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
class TypeScriptComplier {
    static reportDiagnostic(diagnostic) {
        console.error(`[ERROR] error ${diagnostic.code}`, typeof diagnostic.file !== "undefined"
            ? ` - ./${path_1.relative(TypeScriptComplier.formatHost.getCurrentDirectory(), diagnostic.file.fileName)}`
            : "", TypeScriptComplier.formatHost.getNewLine(), chalk_1.default.red(tsc.flattenDiagnosticMessageText(diagnostic.messageText, TypeScriptComplier.formatHost.getNewLine())), TypeScriptComplier.formatHost.getNewLine());
    }
    static fsGetAllFiles(dir) {
        return fs_1.readdirSync(dir).reduce((list, element) => {
            const elementPath = path_1.join(dir, element);
            const elementStat = fs_1.statSync(elementPath);
            if (elementStat.isDirectory()) {
                list.unshift.apply(list, TypeScriptComplier.fsGetAllFiles(elementPath));
            }
            else if (elementStat.isFile()) {
                const elementExtension = path_1.extname(element);
                if (elementExtension === ".ts" || elementExtension === ".tsx") {
                    list.unshift(elementPath);
                }
            }
            return list;
        }, []);
    }
    static fsChmodBinaries(context) {
        if (typeof context.package.bin !== "undefined") {
            Object.values(context.package.bin).forEach(binPath => {
                fs_1.chmodSync(path_1.join(context.path, binPath), "755");
            });
        }
    }
    static build(context) {
        const files = TypeScriptComplier.fsGetAllFiles(path_1.join(context.path, context.compilerOptions.rootDir));
        console.log(`Files to compile :\n${files.map(file => `- ./${path_1.relative(context.path, file)}`).join("\n")}\n`);
        const program = tsc.createProgram(files, context.compilerOptions);
        const emitResult = program.emit();
        const allDiagnostics = tsc.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
        allDiagnostics.forEach(TypeScriptComplier.reportDiagnostic);
        if (emitResult.emitSkipped) {
            process.exit(1);
        }
        else {
            TypeScriptComplier.fsChmodBinaries(context);
            process.exit(0);
        }
    }
    static reportWatchStatusChanged(diagnostic) {
        console.info("[STATUS]", chalk_1.default(tsc.formatDiagnostic(diagnostic, TypeScriptComplier.formatHost)));
    }
    static watch(context) {
        const configPath = tsc.findConfigFile(context.path, tsc.sys.fileExists, "tsconfig.json");
        if (typeof configPath !== "undefined") {
            const createProgram = tsc.createSemanticDiagnosticsBuilderProgram;
            const host = tsc.createWatchCompilerHost(configPath, {}, tsc.sys, createProgram, TypeScriptComplier.reportDiagnostic, TypeScriptComplier.reportWatchStatusChanged);
            const origCreateProgram = host.createProgram;
            host.createProgram = (rootNames, options, host, oldProgram) => origCreateProgram(rootNames, options, host, oldProgram);
            const origPostProgramCreate = host.afterProgramCreate;
            host.afterProgramCreate = program => {
                origPostProgramCreate(program);
                TypeScriptComplier.fsChmodBinaries(context);
            };
            tsc.createWatchProgram(host);
        }
    }
}
exports.TypeScriptComplier = TypeScriptComplier;
TypeScriptComplier.formatHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: tsc.sys.getCurrentDirectory,
    getNewLine: () => tsc.sys.newLine
};
