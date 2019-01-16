import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

export default (directory: string) => {
  console.log(chalk.green('Init !'))
  console.log(directory)
}
