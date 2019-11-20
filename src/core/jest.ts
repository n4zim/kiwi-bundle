import * as ts from "typescript"

/*export const process = (src, path) => {
  const ts = path.endsWith(".ts")
  const tsx = path.endsWith(".tsx")

  if(ts || tsx) {
    src = ts.transpileModule(src, {
      compilerOptions: tsConfig.compilerOptions,
      fileName: path,
    }).outputText

    path = path.substr(0, path.lastIndexOf(".")) + (ts ? ".js" : ".jsx") || path;
  }

  return src
}



const config = {
  "rootDir": "..",
  "roots": [
    "<rootDir>/src"
  ],
  "moduleFileExtensions": [ "ts", "tsx" ],
  "transform": {
    "^.+\\.(ts|tsx)$": "<rootDir>/.jest/preprocessor.js"
  },
  "testRegex": "\\.test\\.(?:ts|tsx)$",
  "transformIgnorePatterns": [
    "/node_modules/"
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "globals": {
    "DEVELOPMENT": false,
    "FAKE_SERVER": false
  }
}*/
