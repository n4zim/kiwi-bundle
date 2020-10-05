import { join } from "path"
import { existsSync, readdirSync, statSync } from "fs"
import { Bundle, KiwiBundlePackage } from "../core/bundle"
import { readFileSync } from "fs"
import { writeFileSync } from "fs"
import { mkdirSync } from "fs"

export const PostInstall = (path: string) => {
  const bundle = new Bundle(path)
  const reactModule = bundle.getModuleName(KiwiBundlePackage.REACT)
  if(typeof bundle.dependencies[reactModule] !== "undefined") {
    const templatePath = join(bundle.path, "node_modules", reactModule, "template")
    if(existsSync(templatePath)) {
      const appJson = JSON.parse(readFileSync(join(templatePath, "app.json"), "utf-8"))
      const appOptions = bundle.getCurrentOptions().app
      const writeFileContent = (path: string, content: string) => {
        path = path.replace(appJson.name, appOptions.id)
        content = content.replace(appJson.name, appOptions.id).replace(appJson.displayName, appOptions.name)
        writeFileSync(path, content)
      }
      readdirSync(templatePath).forEach(subPath => {
        const destinationPath = join(bundle.path, subPath)
        if(!existsSync(destinationPath)) {
          const templateSubPath = join(templatePath, subPath)
          if(statSync(templateSubPath).isDirectory()) {
            mkdirSync(destinationPath)
            console.log(templateSubPath)
          } else {
            writeFileContent(destinationPath, readFileSync(templateSubPath, "utf-8"))
          }
        }
      })
    }
  }
}
