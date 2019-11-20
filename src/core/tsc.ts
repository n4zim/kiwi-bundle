import * as ts from "typescript"
import { relative } from "path"
import chalk = require("chalk")
import { readFileSync } from "fs"
import { KiwiBundleContext } from "./context"

export class TypeScriptComplier {

  private static formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
  }

  private static reportDiagnostic(diagnostic: ts.Diagnostic) {
    console.error(
      `[ERROR] error ${diagnostic.code}`,
      typeof diagnostic.file !== "undefined" ? ` - ./${relative(this.formatHost.getCurrentDirectory(), diagnostic.file.fileName)}` : "",
      this.formatHost.getNewLine(),
      chalk.red(ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        this.formatHost.getNewLine(),
      )),
      this.formatHost.getNewLine(),
    )
  }

  static build(context: KiwiBundleContext) {
    const configPath = ts.findConfigFile(context.path, ts.sys.fileExists, "tsconfig.json")
    if(typeof configPath !== "undefined") {
      const options = JSON.parse(readFileSync(configPath, "utf8")).compilerOptions
      const program = ts.createProgram([ "./src/**/*" ], options)
      const emitResult = program.emit()
      const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
      allDiagnostics.forEach(this.reportDiagnostic)
      process.exit(emitResult.emitSkipped ? 1 : 0)
    }
  }

  private static reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    console.info("[STATUS]", chalk(ts.formatDiagnostic(diagnostic, this.formatHost)))
  }

  static watch(context: KiwiBundleContext) {
    const configPath = ts.findConfigFile(context.path, ts.sys.fileExists, "tsconfig.json")
    if(typeof configPath !== "undefined") {
      const createProgram = ts.createSemanticDiagnosticsBuilderProgram
      const host = ts.createWatchCompilerHost(
        configPath,
        {},
        ts.sys,
        createProgram,
        this.reportDiagnostic,
        this.reportWatchStatusChanged,
      )

      const origCreateProgram = host.createProgram
      host.createProgram = (rootNames, options, host, oldProgram) => {
        return origCreateProgram(rootNames, options, host, oldProgram)
      }

      const origPostProgramCreate = host.afterProgramCreate
      host.afterProgramCreate = program => {
        origPostProgramCreate!(program)
      }

      ts.createWatchProgram(host)
    }
  }

}
