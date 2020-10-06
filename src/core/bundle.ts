import * as tsc from "typescript"
import { join, extname } from "path"
import { existsSync, readFileSync } from "fs"
import { Environment } from "dropin-client"
import { colorText } from "./utils"

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

export enum JsxEmit {
  preserve = 1,
  react = 2,
  "react-native" = 3,
}

export enum KiwiBundlePackage {
  CORE = "core",
  REACT = "react",
  API = "api",
  CLI = "cli",
  VSCODE = "vscode",
  NEUTRALINO = "neutralino",
}

export class Bundle {
  env: Environment
  path: string
  name: string
  dependencies: any
  compiler: any

  constructor(path: string, env: Environment = Environment.DEVELOPMENT) {
    this.env = env
    this.path = path
    const packageJson = this.extractPackageJson(this.path)
    this.name = packageJson.name
    this.dependencies = this.extractPackages(packageJson)
    this.compiler = this.extractTSConfig()
  }

  getModuleName(name: KiwiBundlePackage) {
    if(name === KiwiBundlePackage.CORE) return "kiwi-bundle"
    return `kiwi-bundle-${name}`
  }

  private extractPackageJson(modulePath: string) {
    console.log("Reading", modulePath, "package...")
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
    const packages = { [this.name]: packageJson }
    Object.values(KiwiBundlePackage).forEach(packageName => {
      const moduleName = this.checkPackageModule(packageJson, packageName)
      if(moduleName !== null) {
        packages[moduleName] = this.extractPackageJson(join(this.path, "node_modules", moduleName))
      }
    })
    return packages
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
      if(typeof options.jsx === "string") {
        options.jsx = JsxEmit[options.jsx]
      }
    }
    return options
  }

  getPackageJson(name?: KiwiBundlePackage) {
    if(typeof name === "undefined") {
      return this.dependencies[this.name]
    }
    return this.dependencies[this.getModuleName(name)]
  }

  getPackageHandlerPath(packageName: KiwiBundlePackage, handlerName: string) {
    if(this.getModuleName(packageName) !== this.name) {
      const packageJson = this.getPackageJson(packageName)
      if(typeof packageJson !== "undefined") {
        if(typeof packageJson.bundles !== "undefined") {
          const bundle = packageJson.bundles[this.getModuleName(KiwiBundlePackage.CORE)]
          if(typeof bundle !== "undefined") {
            if(typeof bundle.handlers !== "undefined") {
              if(typeof bundle.handlers[handlerName] !== "undefined") {
                const bundleDir = join(this.path, "node_modules", packageJson.name)
                const bundleOutDir = require(join(bundleDir, "tsconfig.json")).compilerOptions.outDir
                return join(bundleDir, bundleOutDir, bundle.handlers[handlerName])
              }
            }
          }
        }
      }
    }
  }

  getPackageHandler(packageName: KiwiBundlePackage, handlerName: string) {
    const path = this.getPackageHandlerPath(packageName, handlerName)
    if(typeof path !== "undefined") {
      const ext = extname(path)
      if(ext.length !== 0) {
        return require(path.slice(0, -ext.length) + ".js")[ext.slice(1)]
      }
      return require(path + ".js")
    }
  }

  getCurrentOptions() {
    if(typeof this.dependencies[this.name].bundles !== "undefined") {
      const bundle = this.dependencies[this.name].bundles[this.getModuleName(KiwiBundlePackage.CORE)]
      if(typeof bundle !== "undefined") {
        if(typeof bundle.options !== "undefined") {
          return bundle.options
        }
      }
    }
    return {}
  }

  getCurrentHandlers() {
    if(typeof this.dependencies[this.name].bundles !== "undefined") {
      const bundle = this.dependencies[this.name].bundles[this.getModuleName(KiwiBundlePackage.CORE)]
      if(typeof bundle !== "undefined") {
        if(typeof bundle.handlers !== "undefined") {
          return bundle.handlers
        }
      }
    }
    return {}
  }

  display() {
    console.log(colorText(" _____ _       _    _____           _ _", { color: "green" }))
    console.log(colorText("|  |  |_|_ _ _|_|  | __  |_ _ ___ _| | |___", { color: "green" }))
    console.log(colorText("|    -| | | | | |  | __ -| | |   | . | | -_|", { color: "green" }))
    console.log(colorText("|__|__|_|_____|_|  |_____|___|_|_|___|_|___|\n", { color: "green" }))

    if(this.env === Environment.PRODUCTION) {
      console.log("============ [PRODUCTION MODE] =============")
    } else {
      console.log("============ [DEVELOPMENT MODE] ============")
    }

    console.log("Current module :", this.name)
    console.log("Current version :", this.dependencies[this.name].version)

    const tsPackage = this.getPackageJson(KiwiBundlePackage.CORE)
    if(typeof tsPackage !== "undefined") {
      console.log("TypeScript module version :", tsPackage.version)
    }

    if(this.name !== this.getModuleName(KiwiBundlePackage.REACT)) {
      const reactBundle = this.getPackageJson(KiwiBundlePackage.REACT)
      if(typeof reactBundle !== "undefined") {
        console.log("React module version :", reactBundle.version)
      }
    }

    if(this.name !== this.getModuleName(KiwiBundlePackage.API)) {
      const apiBundle = this.getPackageJson(KiwiBundlePackage.API)
      if(typeof apiBundle !== "undefined") {
        console.log("API module version :", apiBundle.version)
      }
    }

    console.log("============================================\n")
  }

}
