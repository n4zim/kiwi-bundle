import { join } from "path"
import chalk from "chalk"
import { existsSync } from "fs"
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
    Object.keys(bundle.dependencies).forEach(packageName => {
      if(packageName !== bundle.name) {
        const deps = bundle.dependencies[packageName].dependencies
        if(typeof deps !== "undefined") {
          Object.keys(deps).forEach(depName => {
            if(ignoreList.indexOf(depName) === -1) {
              console.log(existsSync(join(path, "node_modules", depName)) ? "OK" : depName)
              if(!existsSync(join(path, "node_modules", depName))) {
                exec(`pnpm add --prefer-offline --ignore-scripts --save-optional ${depName}@${deps[depName]}`, (err, output) => {
                  console.log(chalk.bold(`[Kiwi Bundle] Adding "${depName}" package...`))
                  console.log(output)
                })
              }
            }
          })
        }
      }
    })
  }
}
