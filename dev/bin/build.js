const { initTemplate, initNative, readOptions, run } = require("./utils")

module.exports = async (path, args) => {
  const options = readOptions(path)
  if(args.length !== 0) {
    initTemplate(path, options)
    switch (args[0]) {
    case "web":
      run(path, "react-scripts", [ "build" ])
      return
    case "android":
    case "ios":
      initNative(path, options)
      return
    }
  }
  console.log("You must specify a platform to build : web, android or ios")
}
