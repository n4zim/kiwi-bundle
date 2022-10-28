const jest = require("jest")

module.exports = async path => {
  const bundle = new Bundle(path)
  bundle.display()

  const options = {
    projects: [ bundle.compiler.compilerOptions.rootDir ],
    rootDir: bundle.path,
    roots: [ `<rootDir>/${bundle.compiler.compilerOptions.rootDir}` ],
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
