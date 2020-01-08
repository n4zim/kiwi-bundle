
import { Environment } from "dropin-recipes"
import { join } from "path"
import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { TypeScriptCompiler } from "../core/tsc"
import { clearDirectory } from "../core/utils"

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
    TypeScriptCompiler.build(bundle)
  }
}
