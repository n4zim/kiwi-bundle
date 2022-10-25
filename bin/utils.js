const { spawn } = require("child_process")
const { join } = require("path")
const fs = require("fs")

module.exports.initTemplate = async (path) => {
}

module.exports.initBundle = (path) => {
  const kiwiDir = join(path, ".kiwi")
  if(!fs.existsSync(kiwiDir)) {
    fs.mkdirSync(kiwiDir)
  }
}

module.exports.initTemplate.run = (path, bin, args) => {
  return spawn(
    join("node_modules", ".bin", bin),
    args,
    {
      // stdio: [ process.stdin, process.stdout, process.stderr ],
      shell: true,
      stdio: "inherit",
      cwd: path,
      env: {
        ...process.env,
        SKIP_PREFLIGHT_CHECK: "true",
        FORCE_COLOR: "true",
      },
    }
  )
}