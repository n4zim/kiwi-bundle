const { spawn } = require("child_process")
const { join } = require("path")
const { initTemplate, initNative } = require("./utils")

module.exports = async (path, args) => {
  if(args.length !== 0) {
    initTemplate(path)
    //initNative(path)
    switch(args[0]) {
      case "web":
        return
    }
  }

  console.log("You must specify a platform to build : web, android or ios")
    /*spawn(
    join(path, "node_modules/.bin/react-scripts"),
    ["build"],
    {
      shell: true,
      stdio: "inherit",
      //uid: 1000,
      cwd: path,
      env: {
        SKIP_PREFLIGHT_CHECK: "true",
        FORCE_COLOR: "true",
      },
    }
  )*/
}
