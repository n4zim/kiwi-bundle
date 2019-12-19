import { readdirSync, lstatSync, unlinkSync, existsSync } from "fs"
import { Environment } from "dropin-recipes"
import { join } from "path"
import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { TypeScriptComplier } from "../core/tsc"

const clearDirectory = (dir: string) => {
  if(existsSync(dir)) {
    readdirSync(dir).forEach(element => {
      const path = join(dir, element)
      if(lstatSync(path).isDirectory()) {
        clearDirectory(path)
      } else {
        unlinkSync(path)
      }
    })
  }
}

export const Build = (path: string, callback?: () => void) => {
  const bundle = new Bundle(path, Environment.PRODUCTION)
  bundle.display()

  clearDirectory(join(bundle.path, bundle.compiler.outDir))

  const reactHandler = bundle.getPackageHandler(KiwiBundlePackage.REACT, "build")
  if(typeof reactHandler !== "undefined") {
    reactHandler({
      path,
      outDir: bundle.compiler.outDir,
      options: bundle.getCurrentOptions(),
      handlers: bundle.getCurrentHandlers(),
    })
  } else {
    TypeScriptComplier.build(bundle)
  }
}
