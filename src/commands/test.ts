import { KiwiBundleContext } from "../core/context"
import jest from "jest"

export const Test = (path: string) => {
  const context = new KiwiBundleContext(path)
  context.display()

  const options: any = {
    projects: [ context.compilerOptions.rootDir ],
    rootDir: context.path,
    roots: [ `<rootDir>/${context.compilerOptions.rootDir}` ],
    moduleFileExtensions: [ "ts", "tsx", "js", "jsx" ],
    transform: JSON.stringify({
      "^.+\\.(ts|tsx)$": `<rootDir>/${context.compilerOptions.outDir}/core/jest.js`,
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
