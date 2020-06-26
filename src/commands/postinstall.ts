import commandExists from "command-exists"
import { exec } from "child_process"
import { Bundle } from "../core/bundle"
import chalk from "chalk"

const addDeps = (deps: { [name: string]: string }, ignore: string[]) => {
  if(typeof deps !== "undefined") {
    Object.keys(deps).forEach(depName => {
      if(ignore.indexOf(depName) === -1) {
        exec(`pnpm add ${depName}@${deps[depName]}`, (err, output) => {
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
      const currentDepNames: string[] = []
      const currentPackageJson = bundle.getPackageJson()
      if(typeof currentPackageJson.dependencies !== "undefined") {
        Object.keys(currentPackageJson.dependencies).forEach(packageName => {
          currentDepNames.push(packageName)
        })
      }
      if(typeof currentPackageJson.devDependencies !== "undefined") {
        Object.keys(currentPackageJson.devDependencies).forEach(packageName => {
          currentDepNames.push(packageName)
        })
      }
      Object.keys(bundle.dependencies).forEach(packageName => {
        if(packageName !== bundle.name) {
          addDeps(bundle.dependencies[packageName].dependencies, currentDepNames)
          addDeps(bundle.dependencies[packageName].devDependencies, currentDepNames)
        }
      })
    }
  })
}
