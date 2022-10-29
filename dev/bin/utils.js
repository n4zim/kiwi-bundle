const { spawn } = require("child_process")
const { join } = require("path")
const fs = require("fs")

const templateDir = join(__dirname, "..", "template")
const nativeDir = join(__dirname, "..", "native")

const recursiveCopy = (from, to, overrideName) => {
  for(const file of fs.readdirSync(from)) {
    const fromPath = join(from, file)
    const isDir = fs.statSync(fromPath).isDirectory()
    const toPath = join(to, overrideName ? overrideName(file, to, isDir) : file)
    if(isDir) {
      fs.mkdirSync(toPath, { recursive: true })
      recursiveCopy(fromPath, toPath, overrideName)
    } else {
      fs.copyFileSync(fromPath, toPath)
    }
  }
}

module.exports.initTemplate = async (root, options) => {
  const currentFiles = fs.readdirSync(root)
  let srcCreated = false
  for(const template of fs.readdirSync(templateDir)) {
    if(!currentFiles.includes(template)) {
      console.log(`[TEMPLATE] Adding template for "${template}"...`)
      const from = join(templateDir, template)
      const to = join(root, template)
      if(fs.lstatSync(from).isDirectory()) {
        fs.mkdirSync(to)
        recursiveCopy(from, to)
      } else {
        fs.copyFileSync(from, to)
      }
      if(template === "src") {
        srcCreated = true
      }
    }
  }
  if(srcCreated) {
    const path = join(root, "src", "index.ts")
    const content = fs.readFileSync(path, "utf8")
    fs.writeFileSync(path, content.replace("kiwi_bundle_key", options.name))
  }
}

module.exports.initNative = (path, options) => {
  const outputDir = join(path, ".native")

  if(!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  } else {
    for(const file of fs.readdirSync(outputDir)) {
      fs.rmSync(join(outputDir, file), { recursive: true })
    }
  }

  const config = {
    kiwi_bundle_key: options.name,
    kiwi_bundle_version: options.version,
    kiwi_bundle_android_package: options.android.package,
    kiwi_bundle_android_build: options.android.build,
    kiwi_bundle_ios_build: options.ios.build,
  }

  const files = []

  recursiveCopy(nativeDir, outputDir, (name, root, isDir) => {
    if(name === "kiwi_bundle_android_package") {
      name = name.replace(
        "kiwi_bundle_android_package",
        config.kiwi_bundle_android_package.split(".").join("/"),
      )
    } else if(name.startsWith("kiwi_bundle_key")) {
      name = name.replace("kiwi_bundle_key", config.kiwi_bundle_key)
    }
    if(!isDir) {files.push(join(root, name))}
    return name
  })

  for(const file of files) {
    let content = fs.readFileSync(file, "utf8")
    let changed = false
    for(const key in config) {
      if(content.includes(key)) {
        content = content.replace(new RegExp(key, "g"), config[key])
        changed = true
      }
    }
    if(changed) {
      //console.log(`[TEMPLATE] Writing file "${file}"...`)
      fs.writeFileSync(file, content)
    }
  }
}

module.exports.readOptions = (root) => {
  const packageJson = require(join(root, "package.json"))
  return {
    name: packageJson.name,
    version: packageJson.version,
    ...(packageJson.kiwi || {}),
  }
}

module.exports.run = (path, bin, args) => {
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
