"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var command_exists_1 = __importDefault(require("command-exists"));
var inquirer_1 = __importDefault(require("inquirer"));
var child_process_1 = require("child_process");
var config_1 = require("./config");
var isYarnAvailable = command_exists_1.default.sync('yarn');
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
var createConfigFile = function (path, data) {
    console.log("CONFIG FILE CREATED");
};
var promptDataForConfig = function (path) {
    inquirer_1.default.prompt([
        {
            type: 'checkbox',
            name: 'platforms',
            message: 'Platforms on which you want to create your app',
            choices: [
                new inquirer_1.default.Separator('Browser applications'),
                { name: 'Web', value: config_1.Platform.WEB, checked: true },
                new inquirer_1.default.Separator('Mobile applications'),
                { name: 'Android', value: config_1.Platform.ANDROID },
                { name: 'iOS', value: config_1.Platform.IOS },
                new inquirer_1.default.Separator('Desktop applications'),
                { name: 'Linux', value: config_1.Platform.LINUX },
                { name: 'Windows', value: config_1.Platform.WINDOWS },
                { name: 'MacOS', value: config_1.Platform.MACOS },
            ],
            validate: function (answer) {
                if (answer.length < 1)
                    return "You must choose at least one platform";
                return true;
            },
        },
    ]).then(function (answers) {
        createConfigFile(path, answers);
        console.log("\n    " + chalk_1.default.bgGreenBright.black('Your project is now ready !') + "\n");
    });
};
var promptDataForPackage = function (path) {
    inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Name of your projet',
            validate: function (answer) {
                if (answer.length < 3)
                    return "Your project name must have at least 3 characters";
                return true;
            },
        },
        {
            type: 'input',
            name: 'description',
            message: 'A short description of what it is',
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'Enter your name',
        },
        {
            type: 'input',
            name: 'authorEmail',
            message: 'Enter your e-mail address',
        },
        {
            type: 'input',
            name: 'repository',
            message: 'If you have a Git repository, indicate its URL',
            validate: function (answer) {
                if (answer.length === 0)
                    return true;
                if (/^(?:https\:\/\/|git\@).*\.git$/.test(answer))
                    return true;
                return 'It\'s not a valid Git URL (HTTPS or SSH)';
            }
        },
    ]).then(function (answers) {
        //createPackageFile(path, answers)
        promptDataForConfig(path);
    });
};
var checkDirectory = function (path, content) {
    if (content.indexOf('kiwi.yml') !== -1) {
        console.log(chalk_1.default.blue("Kiwi is already initialized inside " + path));
    }
    else {
        console.log("\n    " + chalk_1.default.bgBlack('Let\'s create a new Kiwi app') + "\n");
        if (content.indexOf('package.json') === -1) {
            promptDataForPackage(path);
        }
        else {
            promptDataForConfig(path);
        }
    }
};
exports.default = (function (path) {
    if (fs_1.default.existsSync(path)) {
        if (!fs_1.default.lstatSync(path).isDirectory()) {
            throw "The path " + path + " is not a directory";
        }
    }
    else {
        child_process_1.exec("mkdir -p " + path);
    }
    checkDirectory(path, fs_1.default.readdirSync(path));
});
