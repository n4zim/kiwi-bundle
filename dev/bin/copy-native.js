const path = require("path")
const fs = require("fs")
const { recursiveCopy } = require("./utils")

const to = path.resolve(__dirname, "../.native")

if(!fs.existsSync(to)) {
  fs.mkdirSync(to)
} else {
  for(const file of fs.readdirSync(to)) {
    fs.rmSync(path.join(to, file), { recursive: true })
  }
}

const files = []

const from = path.resolve(__dirname, "../native")

const config = {
  kiwi_bundle_key: "kiwibundle",
  kiwi_bundle_version: "1.0.0",
  kiwi_bundle_android_package: "cc.blueforest.kiwibundle",
  kiwi_bundle_android_build: "1",
  kiwi_bundle_ios_build: "1",
}

recursiveCopy(from, to, (name, root, isDir) => {
  if(name === "kiwi_bundle_android_package") {
    name = name.replace(
      "kiwi_bundle_android_package",
      config.kiwi_bundle_android_package.split(".").join("/"),
    )
  } else if(name.startsWith("kiwi_bundle_key")) {
    name = name.replace("kiwi_bundle_key", config.kiwi_bundle_key)
  }
  if(!isDir) {files.push(path.join(root, name))}
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
    console.log(`[TEMPLATE] Writing file "${file}"...`)
    fs.writeFileSync(file, content)
  }
}
