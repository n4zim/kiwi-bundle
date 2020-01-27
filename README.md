# Kiwi Bundle


## Features
- TypeScript everywhere for a well-structured code
- project boilerplate ready in seconds
- all-in-one NPM package, no versions to manage
- sidekick CLI (start, test & build)


## Getting started
**./package.json** (required)
```json
{
  "name": "example",
  "version": "1.0.0",
  "scripts": {
    "start": "kiwi start",
    "test": "kiwi test",
    "build": "kiwi build"
  },
  "devDependencies": {
    "kiwi-bundle": "3.1.0"
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

### [kiwi-bundle-react](https://github.com/theblueforest/kiwi-bundle-react)

### [kiwi-bundle-api](https://github.com/theblueforest/kiwi-bundle-api)

### [kiwi-bundle-cli-runtime](https://github.com/theblueforest/kiwi-bundle-cli-runtime)

### [kiwi-bundle-vscode](https://github.com/theblueforest/kiwi-bundle-vscode)
