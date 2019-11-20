import { KiwiBundleContext } from "../core/context"
import { TypeScriptComplier } from "../core/tsc"

export const Start = (path: string) => {
  const context = new KiwiBundleContext(path)
  context.display()
  TypeScriptComplier.watch(context)
}
