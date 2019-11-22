import { KiwiBundleContext } from "../core/context"
import { TypeScriptComplier } from "../core/tsc"

export const Start = (path: string) => {
  const context = new KiwiBundleContext(path)
  context.display()

  if(typeof context.bundles.react !== "undefined") {
    context.bundles.react.start(path)
  } else {
    TypeScriptComplier.watch(context)
  }
}
