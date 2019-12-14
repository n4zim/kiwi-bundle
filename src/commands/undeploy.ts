import { Environment } from "dropin-recipes"
import { KiwiBundleContext } from "../core/context"

export const Undeploy = (path: string, stage: string, name?: string) => {
  const context = new KiwiBundleContext(path, Environment.PRODUCTION)
  context.display()

  if(typeof context.handlers.kubeless !== "undefined") {
    context.handlers.kubeless.undeploy({
      path,
      options: context.getPackageJson().bundles["kiwi-bundle"],
      stage,
      name,
    })
  }
}
