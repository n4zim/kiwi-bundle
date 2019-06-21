import chalk from "chalk"
import fs from "fs"
import commandExists from "command-exists"
import inquirer from "inquirer"
import pathLib from "path"
import { exec } from "child_process"
import { Platform } from "./config"

const isYarnAvailable = commandExists.sync("yarn")

/*const createPackageFile = (path: string,
  answers: { name:string, version:string, description:string, authorName:string, authorEmail:string }) =>
{
  const data: { name:string, version:string, description?:string, authorName?:string, authorEmail?:string } = {
    name: answers.name,
    version: "1.0.0",
  }
  if(answers.description.length > 0) data.description = answers.description
  if(answers.authorName.length > 0) data.name = answers.authorName
  if(answers.authorEmail.length > 0) {
    if(data.name.length === 0) {
      data.name = answers.authorEmail
    } else {
      data.name += ` <${answers.authorEmail}>`
    }
  }
  fs.writeFileSync(pathLib.join(path, "package.json"), JSON.stringify(data, null, 2))
}*/

const createConfigFile = (path: string, data: {}) => {
  console.log("CONFIG FILE CREATED")
}

const promptDataForConfig = (path: string) => {
  inquirer.prompt([
    {
      type: "checkbox",
      name: "platforms",
      message: "Platforms on which you want to create your app",
      choices: [
        new inquirer.Separator("Browser applications"),
        { name: "Web", value: Platform.WEB, checked: true },
        new inquirer.Separator("Mobile applications"),
        { name: "Android", value: Platform.ANDROID },
        { name: "iOS", value: Platform.IOS },
        new inquirer.Separator("Desktop applications"),
        { name: "Linux", value: Platform.LINUX },
        { name: "Windows", value: Platform.WINDOWS },
        { name: "MacOS", value: Platform.MACOS },
      ],
      validate: answer => {
        if(answer.length < 1) return "You must choose at least one platform"
        return true
      },
    },
  ]).then((answers: any) => {
    createConfigFile(path, answers)
    console.log(`\n    ${chalk.bgGreenBright.black("Your project is now ready !")}\n`)
  })
}

const promptDataForPackage = (path: string) => {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Name of your projet",
      validate: answer => {
        if(answer.length < 3) return "Your project name must have at least 3 characters"
        return true
      },
    },
    {
      type: "input",
      name: "description",
      message: "A short description of what it is",
    },
    {
      type: "input",
      name: "authorName",
      message: "Enter your name",
    },
    {
      type: "input",
      name: "authorEmail",
      message: "Enter your e-mail address",
    },
    {
      type: "input",
      name: "repository",
      message: "If you have a Git repository, indicate its URL",
      validate: answer => {
        if(answer.length === 0) return true
        if(/^(?:https\:\/\/|git\@).*\.git$/.test(answer)) return true
        return "It\"s not a valid Git URL (HTTPS or SSH)"
      }
    },
  ]).then(answers => {
    // createPackageFile(path, answers)
    promptDataForConfig(path)
  })
}

const checkDirectory = (path: string, content: string[]) => {
  if(content.indexOf("kiwi.yml") !== -1) {
    console.log(chalk.blue(`Kiwi is already initialized inside ${path}`))
  } else {
    console.log(`\n    ${chalk.bgBlack("Let\"s create a new Kiwi app")}\n`)
    if(content.indexOf("package.json") === -1) {
      promptDataForPackage(path)
    } else {
      promptDataForConfig(path)
    }
  }
}

export default (path: string) => {
  if(fs.existsSync(path)) {
    if(!fs.lstatSync(path).isDirectory()) {
      throw `The path ${path} is not a directory`
    }
  } else {
    exec(`mkdir -p ${path}`)
  }
  checkDirectory(path, fs.readdirSync(path))
}
