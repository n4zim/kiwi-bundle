import * as tsc from "typescript"
import { join } from "path"
import { existsSync, readFileSync } from "fs"
import { Environment } from "dropin-recipes"
import chalk from "chalk"

const ModuleKinds: any = {
  none: tsc.ModuleKind.None,
  commonjs: tsc.ModuleKind.CommonJS,
  amd: tsc.ModuleKind.AMD,
  system: tsc.ModuleKind.System,
  umd: tsc.ModuleKind.UMD,
  es6: tsc.ModuleKind.ES2015,
  es2015: tsc.ModuleKind.ES2015,
  esnext: tsc.ModuleKind.ESNext
}

const ScriptTargets: any = {
  es3: tsc.ScriptTarget.ES3,
  es5: tsc.ScriptTarget.ES5,
  es2015: tsc.ScriptTarget.ES2015,
  es2016: tsc.ScriptTarget.ES2016,
  es2017: tsc.ScriptTarget.ES2017,
  es2018: tsc.ScriptTarget.ES2018,
  es2019: tsc.ScriptTarget.ES2019,
  es2020: tsc.ScriptTarget.ES2020,
  esnext: tsc.ScriptTarget.ESNext,
}

export class KiwiBundleContext {
  env: Environment
  path: string
  package: any
  compilerOptions: any
  bundles: {
    core?: any
    react?: any
    reactNative?: any
    electron?: any
  } = {}

  constructor(path: string, env: Environment = Environment.DEVELOPMENT) {
    this.path = path
    this.env = env
    this.loadData()
    this.loadBundles()
  }

  private loadData() {
    const packageJsonPath = join(this.path, "package.json")
    const bundlePath = join(this.path, "node_modules", "kiwi-bundle")
    const bundleJsonPath = join(bundlePath, "package.json")
    if(existsSync(packageJsonPath) && existsSync(bundleJsonPath)) {
      this.package = JSON.parse(readFileSync(packageJsonPath, "utf8"))
      this.bundles.core = JSON.parse(readFileSync(bundleJsonPath, "utf8"))
    }
    const tsConfigPath = join(this.path, "tsconfig.json")
    if(existsSync(tsConfigPath)) {
      const tsConfig = JSON.parse(readFileSync(tsConfigPath, "utf8"))
      if(typeof tsConfig.extends !== "undefined") {
        const extendsConfig = JSON.parse(readFileSync(join(this.path, tsConfig.extends), "utf8"))
        if(typeof tsConfig.compilerOptions !== "undefined") {
          this.compilerOptions = Object.assign(extendsConfig.compilerOptions, tsConfig.compilerOptions)
        } else {
          this.compilerOptions = extendsConfig.compilerOptions
        }
      }
      if(typeof this.compilerOptions.module === "string") {
        this.compilerOptions.module = ModuleKinds[this.compilerOptions.module]
      }
      if(typeof this.compilerOptions.target === "string") {
        this.compilerOptions.target = ScriptTargets[this.compilerOptions.target]
      }
      if(typeof this.compilerOptions.lib === "object") {
        this.compilerOptions.lib = this.compilerOptions.lib.map((lib: string) => `lib.${lib}.d.ts`)
      }
    }
  }

  private loadBundles() {
    if(Object.keys(this.package.dependencies).indexOf("kiwi-bundle-react") !== -1) {
      const kiwiModule = require(join(this.path, "node_modules", "kiwi-bundle-react", "lib", "handlers", "KiwiBundle.js"))
      this.bundles.react = kiwiModule.KiwiBundle
    }
  }

  display() {
    console.log(chalk.green(" _____ _       _    _____           _ _"))
    console.log(chalk.green("|  |  |_|_ _ _|_|  | __  |_ _ ___ _| | |___"))
    console.log(chalk.green("|    -| | | | | |  | __ -| | |   | . | | -_|"))
    console.log(chalk.green("|__|__|_|_____|_|  |_____|___|_|_|___|_|___|\n"))

    if(this.env === Environment.PRODUCTION) {
      console.log("============ [PRODUCTION MODE] =============")
    } else {
      console.log("============ [DEVELOPMENT MODE] ============")
    }

    console.log("Current package :", this.package.name)
    console.log("Current version :", this.package.version)
    console.log("Bundle version  :", this.bundles.core.version)
    console.log("============================================\n")
  }

}
