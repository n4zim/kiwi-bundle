import { extname, join } from "path"
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from "fs"
import { Bundle, KiwiBundlePackage } from "../core/bundle"

type walkAction = (path: string, mode: number, content?: Buffer | string) => void

const walk = (templateRoot: string, destinationRoot: string, action: walkAction) => {
  readdirSync(templateRoot).forEach(subPath => {
    const destinationPath = join(destinationRoot, subPath)
    if(!existsSync(destinationPath)) {
      const templatePath = join(templateRoot, subPath)
      const stat = statSync(templatePath)
      if(stat.isDirectory()) {
        action(destinationPath, stat.mode)
        walk(templatePath, destinationPath, action)
      } else {
        action(destinationPath, stat.mode, readFileSync(templatePath))
      }
    }
  })
}

export const PostInstall = (path: string) => {
  const bundle = new Bundle(path)
  const reactModule = bundle.getModuleName(KiwiBundlePackage.REACT)
  if(typeof bundle.dependencies[reactModule] !== "undefined") {
    const templatePath = join(bundle.path, "node_modules", reactModule, "template")
    if(existsSync(templatePath)) {
      const appJson = JSON.parse(readFileSync(join(templatePath, "app.json"), "utf-8"))
      const appOptions = bundle.getCurrentOptions().app
      walk(templatePath, bundle.path, (path, mode, content) => {
        path = path.replace(appJson.name, appOptions.id)
        if(typeof content === "undefined") {
          mkdirSync(path, { mode })
        } else {
          const ext = extname(path)
          if(ext !== ".jar" && ext !== ".keystore") {
            content = content.toString()
              .replace(`/${appJson.name}/gm`, appOptions.id)
              .replace(`/${appJson.displayName}/gm`, appOptions.name)
          }
          writeFileSync(path, content, { mode })
        }
      })
    }
  }
}
