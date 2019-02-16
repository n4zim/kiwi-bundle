import fs from "fs"
import pathLib from "path"
import { parse as yamlParse } from "yamljs"

const start = (path: string, config: any) => {
  const bundlePath = pathLib.join(path, "node_modules", "kiwi-bundle")
  const binPath = pathLib.join(bundlePath, "node_modules", ".bin", "webpack-dev-server")
  const configPath = pathLib.join(bundlePath, "etc", "webpack", "development.js")

  process.argv[1] = binPath
  process.argv[2] = `--context=${bundlePath}`
  process.argv[3] = `--config=${configPath}`
  process.argv[4] = "--hot"

  require(binPath)
}

export default (path: string) => {
  fs.readFile(pathLib.join(path, "kiwi.yml"), (error, data) => {
    if(!error) {
      start(path, yamlParse(data.toString("utf-8")))
    }
  })
}
