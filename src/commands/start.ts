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
    TypeScriptComplier.watch(context)
  }
}
