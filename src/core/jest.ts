import * as tsc from "typescript"
import { Bundle } from "./bundle"

module.exports = {
  process: (src: string, path: string) => {
    const ts = path.endsWith(".ts")
    const tsx = path.endsWith(".tsx")

    if(ts || tsx) {
      const context = new Bundle(process.env.PWD as string)
      src = tsc.transpileModule(src, {
        compilerOptions: context.compiler,
        fileName: path,
      }).outputText

      path = path.substr(0, path.lastIndexOf(".")) + (ts ? ".js" : ".jsx") || path
    }

    return src
  }
}
