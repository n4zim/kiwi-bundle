import fs from "fs"
import pathLib from 'path'
import { parse as yamlParse } from "yamljs"
import { spawn } from 'child_process'

const start = (path: string, config: any) => {
  const frameworkPath = pathLib.join(path, "node_modules", "kiwi-framework")
  const binPath = pathLib.join(frameworkPath, "node_modules", ".bin", "webpack-dev-server")
  const configPath = pathLib.join(frameworkPath, "configs", "webpack.dev.js")

  const env = Object.create(process.env)
  env.DEV_PORT = config.platforms.web.dev.port

  const command = spawn(binPath, [ `--context=${path}`, `--config=${configPath}` ], { env })
  
  command.stdout.on('data', (data) => {
    //console.log(data.toString())
    process.stdout.write(data)
  })

  command.stderr.on('data', (data) => {
    console.error(data.toString())
    process.stderr.write(data)
  })

  /*command.on('exit', (code) => {
    if(code === null) code = 0
    console.log('child process exited with code ' + code.toString())
  })*/
}

export default (path: string) => {
  fs.readFile(pathLib.join(path, "kiwi.yml"), (error, data) => {
    start(path, yamlParse(data.toString('utf-8')))
  })
}
