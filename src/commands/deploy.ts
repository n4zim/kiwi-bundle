import { Environment } from "dropin-recipes"
import { KiwiBundleContext } from "../core/context"

export const Deploy = (path: string, stage: string, name?: string) => {
  const context = new KiwiBundleContext(path, Environment.PRODUCTION)
  context.display()
}
