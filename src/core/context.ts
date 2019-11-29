import * as tsc from "typescript"
import { join } from "path"
import { existsSync, readFileSync } from "fs"
import { Environment, b5r } from "dropin-recipes"
import chalk from "chalk"
import { KiwiBundleHandlers } from "../.bundles/kiwi-bundle/handlers"

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

enum KiwiBundlePackage {
  CORE = "core",
  REACT = "react",
  REACT_NATIVE = "react-native",
  ELECTRON = "electron",
  VSCODE = "vscode",
}

export class KiwiBundleContext {
  env: Environment
  path: string
  name: string
  packages: any
  handlers: { [name in KiwiBundlePackage]?: any }
  options: { compiler: any }

  constructor(path: string, env: Environment = Environment.DEVELOPMENT) {
    this.env = env
    this.path = path

    const packageJson = this.extractPackageJson(this.path)
    this.name = packageJson.name
    this.packages = this.extractPackages(packageJson)

    this.handlers = this.extractHandlers(packageJson)
    this.options = { compiler: this.extractTSConfig() }
  }

  private getModuleName(name: KiwiBundlePackage) {
    if(name === KiwiBundlePackage.CORE) return "kiwi-bundle"
    return `kiwi-bundle-${name}`
  }

  private extractPackageJson(modulePath: string) {
    return JSON.parse(readFileSync(join(modulePath, "package.json"), "utf8"))
  }

  private checkPackageModule(packageJson: any, packageName: KiwiBundlePackage): string | null {
    const moduleName = this.getModuleName(packageName)
    if((
      typeof packageJson.devDependencies !== "undefined"
      && Object.keys(packageJson.devDependencies).indexOf(moduleName) !== -1
    ) || (
      typeof packageJson.dependencies !== "undefined"
      && Object.keys(packageJson.dependencies).indexOf(moduleName) !== -1
    )) {
      return moduleName
    }
    return null
  }

  private extractPackages(packageJson: any) {
    let packages = { [this.name]: packageJson }
    Object.values(KiwiBundlePackage).forEach(name => {
      const moduleName = this.checkPackageModule(packageJson, name)
      if(moduleName !== null) {
        const path = join(this.path, "node_modules", moduleName)
        packages[moduleName] = this.extractPackageJson(path)
      }
    })
    return packages
  }

  private extractHandlers(packageJson: any) {
    return Object.values(KiwiBundlePackage).reduce((handlers, name) => {
      const moduleName = this.checkPackageModule(packageJson, name)
      if(moduleName !== null) {
        const modulePackage = this.packages[moduleName]
        if(typeof modulePackage.bundles !== "undefined") {
          const moduleBundle = modulePackage.bundles["kiwi-bundle"]
          if(typeof moduleBundle !== "undefined" && typeof moduleBundle.handlers === "string") {
            const modulePath = join(this.path, "node_modules", moduleName)
            const moduleHandlers = require(join(modulePath, moduleBundle.handlers)).default
            handlers[name] = b5r.load<KiwiBundleHandlers>(moduleHandlers)
          }
        }
      }
      return handlers
    }, {} as any)
  }

  private extractTSConfig(): any {
    let options: any = {}
    const tsConfigPath = join(this.path, "tsconfig.json")
    if(existsSync(tsConfigPath)) {
      const tsConfig = JSON.parse(readFileSync(tsConfigPath, "utf8"))
      if(typeof tsConfig.extends !== "undefined") {
        const extendsConfig = JSON.parse(readFileSync(join(this.path, tsConfig.extends), "utf8"))
        if(typeof tsConfig.compilerOptions !== "undefined") {
          options = Object.assign(extendsConfig.compilerOptions, tsConfig.compilerOptions)
        } else {
          options = extendsConfig.compilerOptions
        }
      }
      if(typeof options.module === "string") {
        options.module = ModuleKinds[options.module]
      }
      if(typeof options.target === "string") {
        options.target = ScriptTargets[options.target]
      }
      if(typeof options.lib === "object") {
        options.lib = options.lib.map((lib: string) => `lib.${lib}.d.ts`)
      }
    }
    return options
  }

  getPackageJson(name?: KiwiBundlePackage) {
    if(typeof name === "undefined") {
      return this.packages[this.name]
    }
    return this.packages[this.getModuleName(name)]
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

    console.log("Current package :", this.name)
    console.log("Current version :", this.packages[this.name].version)

    const corePackage = this.getPackageJson(KiwiBundlePackage.CORE)
    if(typeof corePackage !== "undefined") {
      console.log("Core Bundle version  :", corePackage.version)
    }

    const reactBundle = this.getPackageJson(KiwiBundlePackage.REACT)
    if(typeof reactBundle !== "undefined") {
      console.log("React Bundle version  :", reactBundle.version)
    }

    console.log("============================================\n")
  }

}
