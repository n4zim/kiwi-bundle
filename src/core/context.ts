import { join } from "path"
import { existsSync, readFileSync } from "fs"
import { Environment } from "dropin-recipes"
import * as tsc from "typescript"
import chalk from "chalk"

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

  constructor(path: string, env: Environment = Environment.PRODUCTION) {
    this.path = path
    this.env = env
    this.load()
  }

  load() {
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
        const extendsConfig = JSON.parse(readFileSync(join(this.path, tsConfig.extends), "utf8")).compilerOptions
        if(typeof tsConfig.compilerOptions !== "undefined") {
          this.compilerOptions = Object.assign(extendsConfig, tsConfig.compilerOptions)
        } else {
          this.compilerOptions = tsConfig.compilerOptions
        }
      }
      if(typeof this.compilerOptions.target === "string") {
        this.compilerOptions.target = `lib.${this.compilerOptions.target}.d.ts`
      }
      if(typeof this.compilerOptions.lib === "object") {
        this.compilerOptions.lib = this.compilerOptions.lib.map((lib: string) => `lib.${lib}.d.ts`)
      }
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
