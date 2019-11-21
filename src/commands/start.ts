import { KiwiBundleContext } from "../core/context"
import { TypeScriptComplier } from "../core/tsc"
import { chmodSync } from "fs"
import { join } from "path"

export const Start = (path: string) => {
  const context = new KiwiBundleContext(path)
  context.display()
  TypeScriptComplier.watch(context)
}
