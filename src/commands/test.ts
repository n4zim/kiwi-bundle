import jest from "jest"
import { KiwiBundleContext } from "../core/context"

export const Test = (path: string) => {
  const context = new KiwiBundleContext(path)
  context.display()

  const options: any = {
    projects: [ context.options.compiler.rootDir ],
    rootDir: context.path,
    roots: [ `<rootDir>/${context.options.compiler.rootDir}` ],
    moduleFileExtensions: [ "ts", "tsx", "js" ],
    transform: JSON.stringify({
      "^.+\\.(ts|tsx)$": `<rootDir>/${context.options.compiler.outDir}/core/jest.js`,
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
