import { join } from "path"
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from "fs"
import { Bundle, KiwiBundlePackage } from "../core/bundle"

const walk = (templateRoot: string, destinationRoot: string, action: (path: string, content?: string) => void) => {
  readdirSync(templateRoot).forEach(subPath => {
    const destinationPath = join(destinationRoot, subPath)
    if(!existsSync(destinationPath)) {
      const templatePath = join(templateRoot, subPath)
      if(statSync(templatePath).isDirectory()) {
        action(destinationPath)
        walk(templatePath, destinationPath, action)
      } else {
        action(destinationPath, readFileSync(templatePath, "utf-8"))
      }
    }
  })
}

// TODO : ignore binary files and copy permissions

export const PostInstall = (path: string) => {
  const bundle = new Bundle(path)
  const reactModule = bundle.getModuleName(KiwiBundlePackage.REACT)
  if(typeof bundle.dependencies[reactModule] !== "undefined") {
    const templatePath = join(bundle.path, "node_modules", reactModule, "template")
    if(existsSync(templatePath)) {
      const appJson = JSON.parse(readFileSync(join(templatePath, "app.json"), "utf-8"))
      const appOptions = bundle.getCurrentOptions().app
      walk(templatePath, bundle.path, (path, content) => {
        path = path.replace(appJson.name, appOptions.id)
        if(typeof content === "undefined") {
          mkdirSync(path)
        } else {
          content = content.replace(appJson.name, appOptions.id).replace(appJson.displayName, appOptions.name)
          writeFileSync(path, content)
        }
      })
    }
  }
}
