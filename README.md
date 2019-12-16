# Kiwi Bundle - TypeScript


## Features

- TypeScript everywhere for a well-structured code
- project boilerplate ready in seconds
- all-in-one NPM package, no versions to manage
- sidekick CLI (start, test, build & deploy)


## Getting started

**./package.json** (required)
```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "start": "kiwi start",
    "test": "kiwi test",
    "build": "kiwi build",
    "deploy": "kiwi deploy",
    "undeploy": "kiwi undeploy"
  },
  "devDependencies": {
    "kiwi-bundle": "^3.0.1"
  }
}
```

**./tsconfig.json** (required)
```json
{
  "extends": "./node_modules/kiwi-bundle/.models/ts/commonjs.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": [
    "./src/**/*"
  ],
  "exclude": [
    "node_modules",
    "src/**/*.test.ts",
    "src/**/*.test.tsx"
  ]
}
```

**./.gitignore** (recommended)
```
dist/
node_modules/
```

**./tslint.json** (optional)
```json
{
  "extends": "./node_modules/kiwi-bundle/.models/tslint/bf.json"
}
```


## Additional packages

### kiwi-bundle-react

### kiwi-bundle-react-native

### kiwi-bundle-react-electron

### kiwi-bundle-docker

### kiwi-bundle-vscode
