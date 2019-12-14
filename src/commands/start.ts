import { KiwiBundleContext } from "../core/context"
import { TypeScriptComplier } from "../core/tsc"

export const Start = (path: string) => {
  const context = new KiwiBundleContext(path)
  context.display()

  if(typeof context.handlers.react !== "undefined") {
    context.handlers.react.start(
      path,
      context.options.compiler.outDir,
      context.getPackageJson().bundles["kiwi-bundle"]
    )
  } else {
    if(typeof context.handlers.kubeless !== "undefined") {
      context.handlers.kubeless.start({
        path,
        outputDir: context.options.compiler.outDir,
        options: context.getPackageJson().bundles["kiwi-bundle"],
      })
    }

    // TypeScriptComplier.watch(context)
  }
}
