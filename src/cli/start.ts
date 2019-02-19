import pathLib from "path"

export default (path: string) => {
  const bundlePath = pathLib.join(path, "node_modules", "kiwi-bundle")
  // const binPath = pathLib.join(bundlePath, "node_modules", ".bin", "webpack-dev-server")
  const binPath = pathLib.join(path, "node_modules", ".bin", "webpack-dev-server")
  const configPath = pathLib.join(bundlePath, "etc", "webpack", "development.js")

  process.argv[1] = binPath
  process.argv[2] = `--context=${bundlePath}`
  process.argv[3] = `--config=${configPath}`
  process.argv[4] = "--hot"

  require(binPath)
}
