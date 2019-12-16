import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { TypeScriptComplier } from "../core/tsc"

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
    TypeScriptComplier.watch(bundle)
  }
}
