import chalk from "chalk"
import pathLib from "path"
import fs from "fs"

export const webpackConsoleLog = (text: string) => {
  console.log(`${chalk.blue("ℹ")} ${chalk.gray("｢kwb｣")}: ${text}`)
}

export const webpackGetServiceWorker = (clientPath: string) => {
  const serviceWorkerPath = pathLib.join(clientPath, "serviceWorker", "index.ts")
  if(fs.existsSync(serviceWorkerPath)) {
    webpackConsoleLog("Service worker detected")
    return serviceWorkerPath
  } else {
    webpackConsoleLog("No service worker found")
    return null
  }
}
