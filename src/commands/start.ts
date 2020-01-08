import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { TypeScriptCompiler } from "../core/tsc"

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
    })
  } else {
    const apiHandler = bundle.getPackageHandler(KiwiBundlePackage.API, "start")
    if(typeof apiHandler !== "undefined") {
      const version = `v${bundle.getPackageJson().version.split(".")[0]}`
      const handlers = bundle.getCurrentHandlers()
      apiHandler({
        path,
        rootDir: bundle.compiler.rootDir,
        outDir: bundle.compiler.outDir,
        version,
        options: bundle.getCurrentOptions(),
        handlers,
      })
    } else {
      TypeScriptCompiler.watch(bundle)
    }
  }
}
