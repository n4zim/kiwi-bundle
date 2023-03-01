![Kiwi Bundle](./assets/cover.png)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftheblueforest%2Fkiwi-bundle.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftheblueforest%2Fkiwi-bundle?ref=badge_shield)


# Features
- out-of-the box configurations for [TypeScript](https://github.com/microsoft/TypeScript), [React](https://github.com/facebook/react), [React Native](https://github.com/facebook/react-native), [Babel](https://github.com/babel/babel) and [ESLint](https://github.com/eslint/eslint)
- integration of [react-native-web](https://github.com/necolas/react-native-web) for building **web**, **Android** and **iOS** apps with the same codebase
- **instant start-up** and **hot reloading** to see your components changes in real time
- only two NPM packages : one for development and one for distribution


# Getting started

## Requirements
You will need NodeJS to be installed : https://nodejs.org/en/download/

For Android builds, [Java](https://openjdk.java.net) and [Android Studio](https://developer.android.com/studio/index.html) are required

For iOS builds, you need to have Xcode installed on your Mac

Optionally you can install `yarn` in replacement of `npm` by running `npm install -g yarn`

Finally, if you do not have a text editor yet, give VSCode a try : https://code.visualstudio.com

## Install
Create a **./package.json** file :
```json
{
  "name": "kiwibundle",
  "version": "1.0.0",
  "kiwi": {
    "android": {
      "package": "cc.blueforest.kiwibundle",
      "build": 1
    },
    "ios": {
      "bundle": "cc.blueforest.kiwibundle",
      "build": 1
    }
  },
  "scripts": {
    "start": "kiwi start",
    "build": "kiwi build"
  },
  "dependencies": {
    "kiwi-bundle": "4.6.3-10"
  },
  "devDependencies": {
    "kiwi-bundle-dev": "4.6.3-10"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Put your own values on "name" and "kiwi.android.package", then run `npm install` or `yarn install`


## Commands

### Web
To start a local server, run `npm run start web` or `yarn start web`

To build static files, run `npm run build web` or `yarn build web`

### Android
To start development environment :
1. Run `npm run start metro` or `yarn start metro`
2. Run `npm run start android` or `yarn start android`

To build production files, run `npm run build android` or `yarn build android`

### iOS
Before your first start, you will need to run `pod install` in `./ios` to install CocoaPods dependencies

Then run `npm run start ios` or `yarn start ios`


## Routing for web
```typescript
import * as Kiwi from "kiwi-bundle"

Kiwi.App({
  key: "kiwibundle",
  routes: { // the router will check the FIRST MATCHING ROUTE
    root: { // this is the default route if no other matches
      path: "/", // http://localhost:3000
    },
    dir: { // all routes MUST start with /
      path: "/dir", // http://localhost:3000/dirè
    },
    dynamic: { // dynamic routes are supported with props
      path: "/dir/{dynamic}", // http://localhost:3000/dir/test (props = { dynamic: "test" })
    },
    subdomain: { // before the first /, you can specify a subdomain
      path: "subdomain/", // http://subdomain.localhost:3000
    },
    testSubdomain: { // you can use as many subdomains as you want
      path: "test.subdomain", // http://test.subdomain.localhost:3000
    },
    dynamicSubdomain: { // dynamic subdomains are supported with props
      path: "{domain}.subdomain/dir", // http://a.subdomain.localhost:3000/dir (props = { domain: "a" })
    },
  },
})
```
