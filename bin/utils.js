const { spawn } = require("child_process")
const { join } = require("path")
const fs = require("fs")

const templateDir = join(__dirname, "..", "template")

const recursiveCopy = (from, to) => {
  for(const file of fs.readdirSync(from)) {
    const fromPath = join(from, file)
    const toPath = join(to, file)
    const stats = fs.statSync(fromPath)
    if(stats.isDirectory()) {
      fs.mkdirSync(toPath)
      recursiveCopy(fromPath, toPath)
    } else {
      fs.copyFileSync(fromPath, toPath)
    }
  }
}

module.exports.initTemplate = async (path) => {
  const currentFiles = fs.readdirSync(path)
  for(const template of fs.readdirSync(templateDir)) {
    if(!currentFiles.includes(template)) {
      console.log(`[TEMPLATE] Adding template for "${template}"...`)
      const from = join(templateDir, template)
      const to = join(path, template)
      if(fs.lstatSync(from).isDirectory()) {
        fs.mkdirSync(to)
        recursiveCopy(from, to)
      } else {
        fs.copyFileSync(from, to)
      }
    }
  }
}

module.exports.initNative = (path) => {
  const nativeDir = join(path, ".native")
  if(!fs.existsSync(nativeDir)) {
    fs.mkdirSync(nativeDir)
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