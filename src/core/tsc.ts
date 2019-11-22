import * as tsc from "typescript"
import { relative, join, extname } from "path"
import chalk from "chalk"
import { readdirSync, statSync, chmodSync } from "fs"
import { KiwiBundleContext } from "./context"

export class TypeScriptComplier {

  private static formatHost: tsc.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: tsc.sys.getCurrentDirectory,
    getNewLine: () => tsc.sys.newLine,
  }

  private static reportDiagnostic(diagnostic: tsc.Diagnostic) {
    console.error(
      `[ERROR] error ${diagnostic.code}`,
      typeof diagnostic.file !== "undefined"
        ? ` - ./${relative(join(TypeScriptComplier.formatHost.getCurrentDirectory(), ".."), diagnostic.file.fileName)}`
        : "",
      TypeScriptComplier.formatHost.getNewLine(),
      chalk.red(tsc.flattenDiagnosticMessageText(diagnostic.messageText, TypeScriptComplier.formatHost.getNewLine())),
      TypeScriptComplier.formatHost.getNewLine(),
    )
  }

  private static fsGetAllFiles(dir: string): string[] {
    return readdirSync(dir).reduce<string[]>((list, element) => {
      const elementPath = join(dir, element)
      const elementStat = statSync(elementPath)
      if(elementStat.isDirectory()) {
        list.unshift.apply(list, TypeScriptComplier.fsGetAllFiles(elementPath))
      } else if(elementStat.isFile()) {
        const elementExtension = extname(element)
        if(elementExtension === ".ts" || elementExtension === ".tsx") {
          list.unshift(elementPath)
        }
      }
      return list
    }, [])
  }

  private static fsChmodBinaries(context: KiwiBundleContext) {
    if(typeof context.package.bin !== "undefined") {
      (Object.values(context.package.bin) as string[]).forEach(binPath => {
        chmodSync(join(context.path, binPath), "755")
      })
    }
  }

  static build(context: KiwiBundleContext) {
    const files = TypeScriptComplier.fsGetAllFiles(join(context.path, context.compilerOptions.rootDir))
    console.log(`Files to compile :\n${files.map(file => `- ./${relative(context.path, file)}`).join("\n")}\n`)
    const program = tsc.createProgram(files, context.compilerOptions)
    const emitResult = program.emit()
    const allDiagnostics = tsc.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
    allDiagnostics.forEach(TypeScriptComplier.reportDiagnostic)
    if(emitResult.emitSkipped) {
      process.exit(1)
    } else {
      TypeScriptComplier.fsChmodBinaries(context)
      process.exit(0)
    }
  }

  private static reportWatchStatusChanged(diagnostic: tsc.Diagnostic) {
    let tag = "[STATUS]"
    switch(diagnostic.code) {
      case 6031:
      case 6032:
        tag = chalk.bgYellowBright(chalk.black(" WORKING "))
        break
      case 6193:
        tag = chalk.bgRedBright(chalk.black(" ERRORS "))
        break
      case 6194:
        tag = chalk.bgGreenBright(chalk.black(" READY "))
        break
    }
    console.info(tag, tsc.formatDiagnostic(diagnostic, TypeScriptComplier.formatHost))
  }

  static watch(context: KiwiBundleContext) {
    const configPath = tsc.findConfigFile(context.path, tsc.sys.fileExists, "tsconfig.json")
    if(typeof configPath !== "undefined") {
      const createProgram = tsc.createSemanticDiagnosticsBuilderProgram
      const host = tsc.createWatchCompilerHost(
        configPath,
        {},
        tsc.sys,
        createProgram,
        TypeScriptComplier.reportDiagnostic,
        TypeScriptComplier.reportWatchStatusChanged,
      )

      const origCreateProgram = host.createProgram
      host.createProgram = (rootNames, options, host, oldProgram) => origCreateProgram(rootNames, options, host, oldProgram)

      const origPostProgramCreate = host.afterProgramCreate
      host.afterProgramCreate = program => {
        origPostProgramCreate!(program)
        TypeScriptComplier.fsChmodBinaries(context)
      }

      tsc.createWatchProgram(host)
    }
  }

}
