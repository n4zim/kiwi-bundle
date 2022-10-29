const { initTemplate, initNative, readOptions } = require("./utils")

module.exports = async (path, args) => {
  const options = readOptions(path)
  if(args.length !== 0) {
    initTemplate(path, options)
    initNative(path, options)
    switch (args[0]) {
    case "web":

      return
    }
  }
  console.log("You must specify a platform to build : web, android or ios")
}
