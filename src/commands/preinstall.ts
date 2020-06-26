import commandExists from "command-exists"
import { join } from "path"
import { exec } from "child_process"
import { Bundle } from "../core/bundle"

export const PreInstall = (path: string) => {
  console.log("there")
  commandExists("pnpm").then(exists => {
    if(exists) {
      const pnpmfile = join(path, "node_modules/kiwi-bundle/dist/core/pnpmfile.js")
      console.log(`pnpm install --dir ${path} --pnpmfile ${pnpmfile}`)
      exec(`pnpm install --dir ${path} --pnpmfile ${pnpmfile}`, (err, out) => {
        console.log(out)
      })
    }
  })
}
