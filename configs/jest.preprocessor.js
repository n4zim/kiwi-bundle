const tsc = require('typescript')
const tsConfig = require('./../tsconfig.json')

module.exports = {
  process(src, path) {
    const ts = path.endsWith('.ts')
    const tsx = path.endsWith('.tsx')
  
    if(ts || tsx) {
      src = tsc.transpileModule(src, {
        compilerOptions: tsConfig.compilerOptions,
        fileName: path,
      }).outputText

      path = path.substr(0, path.lastIndexOf('.')) + (ts ? '.js' : '.jsx') || path
    }

    return src
  },
}
