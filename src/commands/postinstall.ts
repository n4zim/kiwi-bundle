import { join, dirname } from "path"
import { existsSync, symlink, mkdirSync } from "fs"
import { exec } from "child_process"
import { Bundle } from "../core/bundle"

export const PostInstall = (path: string) => {
  if(existsSync(join(path, "pnpm-lock.yaml"))) {
    const bundle = new Bundle(path)
    const ignoreList: string[] = []
    const currentPackageJson = bundle.getPackageJson()
    if(typeof currentPackageJson.dependencies !== "undefined") {
      Object.keys(currentPackageJson.dependencies).forEach(packageName => {
        ignoreList.push(packageName)
      })
    }
    if(typeof currentPackageJson.devDependencies !== "undefined") {
      Object.keys(currentPackageJson.devDependencies).forEach(packageName => {
        ignoreList.push(packageName)
      })
    }
    const deps: { [name: string]: string } = {}
    Object.keys(bundle.dependencies).forEach(packageName => {
      if(packageName !== bundle.name) {
        const packageDeps = bundle.dependencies[packageName].dependencies
        if(typeof packageDeps !== "undefined") {
          Object.keys(packageDeps).forEach(depName => {
            if(typeof deps[depName] === "undefined" && ignoreList.indexOf(depName) === -1) {
              deps[depName] = packageName
            }
          })
        }
      }
    })
    Object.keys(deps).forEach(depName => {
      const depPath = join(path, "node_modules", depName)
      if(!existsSync(depPath)) {
        const depDir = dirname(depPath)
        if(!existsSync(depDir)) mkdirSync(depDir)
        symlink(join(path, "node_modules", deps[depName], "node_modules", depName), depPath, () => {
          console.log(`Added symbolic link for "${depName}" dependency from ${deps[depName]}\n`)
        })
      }
    })
  }
}
