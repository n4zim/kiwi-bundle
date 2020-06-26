import commandExists from "command-exists"
import chalk from "chalk"
import { exec } from "child_process"
import { Bundle } from "../core/bundle"

const addDeps = (deps: { [name: string]: string }|undefined, ignoreList: string[]) => {
  if(typeof deps !== "undefined") {
    Object.keys(deps).forEach(depName => {
      if(ignoreList.indexOf(depName) === -1) {
        exec(`pnpm add --offline --ignore-scripts ${depName}@${deps[depName]}`, (err, output) => {
          console.log(chalk.bold(`[Kiwi Bundle] Adding "${depName}" package...`))
          console.log(output)
        })
      }
    })
  }
}

export const PostInstall = (path: string) => {
  commandExists("pnpm").then(exists => {
    if(exists) {
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
          addDeps(bundle.dependencies[packageName].dependencies, ignoreList)
          addDeps(bundle.dependencies[packageName].devDependencies, ignoreList)
        }
      })
    }
  })
}
