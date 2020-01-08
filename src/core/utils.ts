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
