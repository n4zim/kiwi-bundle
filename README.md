
![Kiwi Bundle](./assets/cover.png)

# Features
- out-of-the box configurations for [TypeScript](https://github.com/microsoft/TypeScript), [ESLint](https://github.com/eslint/eslint) and [Prettier](https://github.com/prettier/prettier)
- integration of [Jest](https://github.com/facebook/jest) for testing
- sidekick scripts for start, test, build, clean and postinstall
- all-in-one NPM package, no versions to manage

# Getting started

## Requirements
You will need NodeJS to be installed : https://nodejs.org/en/download/

Optionally you can install `yarn` in replacement of `npm` by running `npm install -g yarn`

If you want Prettier as a code formatter, you will need to install it : https://prettier.io/docs/en/install.html

Finally, if you do not have a text editor yet, give VSCode a try : https://code.visualstudio.com


## Install
Create a **./package.json** file :
```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "start": "kiwi start",
    "test": "kiwi test",
    "build": "kiwi build",
    "clean": "kiwi clean",
    "postinstall": "kiwi postinstall"
  },
  "devDependencies": {
    "kiwi-bundle": "3.2.0"
  }
}
```

Then run `npm install` or `yarn install`

## Commands
To start, run `npm run start` or `yarn start`

To launch Jest for .test.ts file, run `npm run test` or `yarn test`

To build, run `npm run build` or `yarn build`


## Additional packages

### [kiwi-bundle-react](https://github.com/theblueforest/kiwi-bundle-react) : easily build a cross-platform app with React
### [kiwi-bundle-api](https://github.com/theblueforest/kiwi-bundle-api) : easily build an HTTP server with NodeJS
### [kiwi-bundle-cli](https://github.com/theblueforest/kiwi-bundle-cli) : easily build a cross-platform CLI with NodeJS
### [kiwi-bundle-vscode](https://github.com/theblueforest/kiwi-bundle-vscode) : easily build a VSCode extension
