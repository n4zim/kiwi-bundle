import { Environment } from "dropin-recipes"
import { KiwiBundleContext } from "../core/context"
import { TypeScriptComplier } from "../core/tsc"

export const Build = (path: string) => {
  const context = new KiwiBundleContext(path, Environment.PRODUCTION)
  context.display()
  TypeScriptComplier.build(context)
}
