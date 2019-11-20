import { KiwiBundleContext } from "../core/context"
import { TypeScriptComplier } from "../core/tsc"
import { Environment } from "dropin-recipes"

export const Build = (path: string) => {
  const context = new KiwiBundleContext(path, Environment.PRODUCTION)
  TypeScriptComplier.build(context)
}
