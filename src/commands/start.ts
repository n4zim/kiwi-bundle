import { join } from "path"
import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { TypeScriptCompiler } from "../core/tsc"
import { clearDirectory } from "../core/utils"

export const Start = (path: string) => {
  const bundle = new Bundle(path)
  bundle.display()

  const reactHandler = bundle.getPackageHandler(KiwiBundlePackage.REACT, "start")

  if(typeof reactHandler !== "undefined") {
    reactHandler({
      path,
      outDir: bundle.compiler.outDir,
      options: bundle.getCurrentOptions(),
      handlers: bundle.getCurrentHandlers(),
      args: process.argv.slice(3),
    })
  } else {
    const apiHandler = bundle.getPackageHandler(KiwiBundlePackage.API, "start")
    if(typeof apiHandler !== "undefined") {
      clearDirectory(join(bundle.path, bundle.compiler.outDir))
      // version: `v${bundle.getPackageJson().version.split(".")[0]}`,
      apiHandler({
        path,
        rootDir: bundle.compiler.rootDir,
        handlers: bundle.getCurrentHandlers(),
        outDir: bundle.compiler.outDir,
        options: bundle.getCurrentOptions(),
        packageJson: bundle.getPackageJson(),
      })
    } else {
      TypeScriptCompiler.watch(bundle)
    }
  }
}
