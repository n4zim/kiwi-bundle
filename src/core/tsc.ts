import * as tsc from "typescript"
import { relative, join, extname } from "path"
import chalk from "chalk"
import { readdirSync, statSync, chmodSync } from "fs"
import { Bundle } from "./bundle"

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

  private static fsChmodBinaries(context: Bundle) {
    const packageJson = context.getPackageJson()
    if(typeof packageJson.bin !== "undefined") {
      (Object.values(packageJson.bin) as string[]).forEach(binPath => {
        chmodSync(join(context.path, binPath), "755")
      })
    }
  }

  static build(bundle: Bundle, callback?: (files: string[]) => void) {
    const files = TypeScriptComplier.fsGetAllFiles(join(bundle.path, bundle.compiler.rootDir))
    console.log(`Files to compile :\n${files.map(file => `- ./${relative(bundle.path, file)}`).join("\n")}\n`)

    /*files.forEach(file => {
      console.log((program.getSourceFile(file) as any).resolvedModules)
    })*/

    const program = tsc.createProgram(files, bundle.compiler)
    const emitResult = program.emit()
    const allDiagnostics = tsc.getPreEmitDiagnostics(program).concat(emitResult.diagnostics)
    allDiagnostics.forEach(TypeScriptComplier.reportDiagnostic)
    if(emitResult.emitSkipped) {
      process.exit(1)
    } else {
      TypeScriptComplier.fsChmodBinaries(bundle)
      if(typeof callback !== "undefined") {
        callback(files)
      } else {
        process.exit(0)
      }
    }
  }

  private static reportWatchStatusChanged(diagnostic: tsc.Diagnostic) {
    let tag = "[STATUS]"
    switch(diagnostic.code) {
      case 6031:
      case 6032:
        tag = chalk.bgYellow(chalk.white(" WORKING "))
        break
      case 6193:
        tag = chalk.bgRed(chalk.white(" ERRORS "))
        break
      case 6194:
        tag = chalk.bgGreen(chalk.white(" READY "))
        break
    }
    console.info(tag, tsc.formatDiagnostic(diagnostic, TypeScriptComplier.formatHost))
  }

  static watch(context: Bundle) {
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
