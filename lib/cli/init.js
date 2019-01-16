"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var inquirer_1 = __importDefault(require("inquirer"));
var config_1 = require("./config");
var promptData = function () {
    console.log("\n" + chalk_1.default.bgBlack('Let\'s create a new Kiwi app !') + "\n");
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
            name: 'author',
            message: 'Enter your name',
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
        console.log(answers);
    });
};
var checkDirectory = function (path, content) {
    var srcPath = path_1.default.join(path, "src");
    if (content.indexOf('kiwi.yml') !== -1) {
        console.log(chalk_1.default.blue("Kiwi is already initialized inside " + path));
        /*} else if(content.indexOf('package.json') !== -1) {
          throw `The directory ${path} must not contain an existing Node package (package.json)`
        } else if(content.indexOf('src') !== -1 && fs.lstatSync(srcPath).isDirectory()) {
          throw `The directory ${path} must not contain an src/ directory`*/
    }
    else {
        promptData();
    }
};
exports.default = (function (path) {
    if (fs_1.default.existsSync(path)) {
        if (fs_1.default.lstatSync(path).isDirectory()) {
            checkDirectory(path, fs_1.default.readdirSync(path));
        }
        else {
            throw "The path " + path + " is not a directory";
        }
    }
    else {
        throw "The path " + path + " does not exists";
    }
});
