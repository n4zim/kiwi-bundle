
function getPackageDepencencies(name) {
  var packageJson = JSON.parse(require("fs").readFileSync("./node_modules/" + name + "/package.json", "utf-8"))
  if(typeof packageJson.dependencies !== "undefined") return packageJson.dependencies
}

module.exports = {
  hooks: {
    readPackage(pkg, ctx) {
      if(pkg.name === "kiwi-bundle-react") {
        var deps = getPackageDepencencies("kiwi-bundle")
        if(typeof deps !== "undefined") {
          pkg.dependencies = deps
          ctx.log(`[Kiwi Bundle] Added required dependencies`)
        }
      }
      return pkg
    }
  }
}
