import { readdirSync, lstatSync, unlinkSync } from "fs"
import { join } from "path"
import { KiwiBundleContext } from "../core/context"
import { Environment } from "dropin-recipes"
import { TypeScriptComplier } from "../core/tsc"

const clearDirectory = (dir: string) => {
  readdirSync(dir).forEach(element => {
    const path = join(dir, element)
    if(lstatSync(path).isDirectory()) {
      clearDirectory(path)
    } else {
      unlinkSync(path)
    }
  })
}

export const Build = (path: string) => {
  const context = new KiwiBundleContext(path, Environment.PRODUCTION)
  context.display()
  clearDirectory(join(context.path, context.compilerOptions.outDir))
  TypeScriptComplier.build(context)
}
