import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { TypeScriptComplier } from "../core/tsc"
import { join } from "path"

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
      TypeScriptComplier.watch(bundle, () => {
        const version = `v${bundle.getPackageJson().version.split(".")[0]}`
        const handlers = bundle.getCurrentHandlers()
        apiHandler({
          version,
          options: bundle.getCurrentOptions(),
          handlers: Object.keys(handlers).reduce((result, current) => {
            let handlerPath = `/${version}${current.replace(/\{.*?\}/g, "([A-Za-z0-9]+)")}`
            if(handlerPath.charAt(handlerPath.length - 1) === "/") handlerPath += "?"
            result["^" + handlerPath + "$"] = {
              path: join(path, bundle.compiler.outDir, handlers[current] + ".js"),
              params: current.match(/\{.*?\}/g)?.map(c => c.slice(1, -1)),
            }
            return result
          }, {} as any),
        })
      })
    } else {
      TypeScriptComplier.watch(bundle)
    }
  }
}
