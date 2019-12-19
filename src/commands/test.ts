import jest from "jest"
import { Bundle } from "../core/bundle"

export const Test = (path: string) => {
  const bundle = new Bundle(path)
  bundle.display()

  const options: any = {
    projects: [ bundle.compiler.rootDir ],
    rootDir: bundle.path,
    roots: [ `<rootDir>/${bundle.compiler.rootDir}` ],
    moduleFileExtensions: [ "ts", "tsx", "js" ],
    transform: JSON.stringify({
      "^.+\\.(ts|tsx)$": `<rootDir>/node_modules/kiwi-bundle/dist/core/jest.js`,
    }),
    transformIgnorePatterns: [ "/node_modules/" ],
    moduleDirectories: [ "node_modules" ],
    testRegex: "\\.test\\.(?:ts|tsx)$",
    globals: JSON.stringify({
      "DEVELOPMENT": false,
      "FAKE_SERVER": false,
    }),
  }

  jest.runCLI(options, options.projects)
}
