import { Environment } from "dropin-recipes"
import { KiwiBundleContext } from "../core/context"

export const Deploy = (path: string, stage: string, name?: string) => {
  const context = new KiwiBundleContext(path, Environment.PRODUCTION)
  context.display()

  if(typeof context.handlers.kubeless !== "undefined") {
    context.handlers.kubeless.deploy({
      path,
      outputDir: context.options.compiler.outDir,
      options: context.getPackageJson().bundles["kiwi-bundle"],
      packageJson: context.packageJson,
      stage,
      name,
    })
  }
}
