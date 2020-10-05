import { readdirSync, lstatSync, unlinkSync, existsSync } from "fs"
import { join } from "path"

export const clearDirectory = (dir: string) => {
  if(existsSync(dir)) {
    readdirSync(dir).forEach(element => {
      const path = join(dir, element)
      if(lstatSync(path).isDirectory()) {
        clearDirectory(path)
      } else {
        unlinkSync(path)
      }
    })
  }
}

export const colorText = (text: string, theme: { background?: string, color?: string }) => {
  if(typeof theme.color !== "undefined") {
    switch(theme.color) {
      case "black": text = `\x1b[30m${text}`; break
      case "red": text = `\x1b[31m${text}`; break
      case "green": text = `\x1b[32m${text}`; break
      case "yellow": text = `\x1b[33m${text}`; break
      case "blue": text = `\x1b[34m${text}`; break
      case "magenta": text = `\x1b[35m${text}`; break
      case "cyan": text = `\x1b[36m${text}`; break
      case "white": text = `\x1b[37m${text}`; break
    }
  }
  if(typeof theme.background !== "undefined") {
    switch(theme.background) {
      case "black": text = `\x1b[40m${text}`; break
      case "red": text = `\x1b[41m${text}`; break
      case "green": text = `\x1b[42m${text}`; break
      case "yellow": text = `\x1b[43m${text}`; break
      case "blue": text = `\x1b[44m${text}`; break
      case "magenta": text = `\x1b[45m${text}`; break
      case "cyan": text = `\x1b[46m${text}`; break
      case "white": text = `\x1b[47m${text}`; break
    }
  }
  return text + "\x1b[0m"
}
