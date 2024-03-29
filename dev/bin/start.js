const { run, readOptions, initTemplate, initNative, patchWeb } = require("./utils")

const help = () => {
  console.log("You have to choose which platform to start :")
  console.log("- web : local development in browser")
  console.log("- metro : link between this host and mobile applications")
  console.log("- android : development on Android device")
  console.log("- ios : development on iOS device")
}

module.exports = async (path, args) => {
  if(args.length !== 1) {
    if(args.length !== 0) {
      console.log("/!\\ You provided too many arguments\n")
    }
    help()
  } else {
    const options = readOptions(path)
    initTemplate(path, options)
    switch (args[0]) {
    case "web":
      patchWeb()
      const webEnv = { BROWSER: "none" }
      if(options?.web?.dev) {
        webEnv.HOST = options.web.dev
      }
      run(path, "react-scripts", [ "start" ], webEnv)
      break
    case "metro":
      run(path, "react-native", [ "start", "--reset-cache" ])
      break
    case "android":
      initNative(path, options)
      run(path, "react-native", [ "run-android" ])
      break
    case "ios":
      initNative(path, options)
      run(path, "react-native", [ "run-ios" ])
      break
    default:
      console.log(`/!\\ Unknown argument "${args[0]}"\n`)
      help()
      break
    }
  }
}
