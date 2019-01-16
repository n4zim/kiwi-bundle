import chalk from 'chalk'
import fs from 'fs'
//import pathLib from 'path'
import commandExists from 'command-exists'
import inquirer from 'inquirer'
import { Platform } from './config'

const isYarnAvailable = commandExists.sync('yarn')

const promptDataForConfig = () => {
  inquirer.prompt([
    {
      type: 'checkbox',
      name: 'platforms',
      message: 'Platforms on which you want to create your app',
      choices: [
        new inquirer.Separator('Browser applications'),
        { name: 'Web', value: Platform.WEB, checked: true },
        new inquirer.Separator('Mobile applications'),
        { name: 'Android', value: Platform.ANDROID },
        { name: 'iOS', value: Platform.IOS },
        new inquirer.Separator('Desktop applications'),
        { name: 'Linux', value: Platform.LINUX },
        { name: 'Windows', value: Platform.WINDOWS },
        { name: 'MacOS', value: Platform.MACOS },
      ],
      validate: answer => {
        if(answer.length < 1) return "You must choose at least one platform"
        return true
      },
    },
  ])
}

const createPackageFile = (data: {}) => {

}

const promptDataForPackage = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Name of your projet',
      validate: answer => {
        if(answer.length < 3) return "Your project name must have at least 3 characters"
        return true
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'A short description of what it is',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter your name',
    },
    {
      type: 'input',
      name: 'repository',
      message: 'If you have a Git repository, indicate its URL',
      validate: answer => {
        if(answer.length === 0) return true
        if(/^(?:https\:\/\/|git\@).*\.git$/.test(answer)) return true
        return 'It\'s not a valid Git URL (HTTPS or SSH)'
      }
    },
  ]).then(answers => {
    createPackageFile(answers)
    promptDataForConfig()
  })
}

const checkDirectory = (path: string, content: string[]) => {
  //const srcPath = pathLib.join(path, "src")
  if(content.indexOf('kiwi.yml') !== -1) {
    console.log(chalk.blue(`Kiwi is already initialized inside ${path}`))
  /*} else if(content.indexOf('package.json') !== -1) {
    throw `The directory ${path} must not contain an existing Node package (package.json)`
  } else if(content.indexOf('src') !== -1 && fs.lstatSync(srcPath).isDirectory()) {
    throw `The directory ${path} must not contain an src/ directory`*/
  } else {
    console.log(`\n${chalk.bgBlack('Let\'s create a new Kiwi app !')}\n`)
    if(content.indexOf('package.json') === -1) {
      promptDataForPackage()
    } else {
      promptDataForConfig()
    }
  }
}

export default (path: string) => {
  if(fs.existsSync(path)) {
    if(fs.lstatSync(path).isDirectory()) {
      checkDirectory(path, fs.readdirSync(path))
    } else {
      throw `The path ${path} is not a directory`
    }
  } else {
    throw `The path ${path} does not exists`
  }
}
