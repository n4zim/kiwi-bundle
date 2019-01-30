import path from 'path'

const projectPath = process.argv[2]
const binPath = path.join(projectPath, "node_modules", ".bin", "webpack-dev-server")
const configPath = path.join(projectPath, "node_modules", "kiwi-bundle", "etc", "webpack", "development.js")

//console.log(`${binPath} --context=${projectPath} --config=${configPath}`)
console.log(`${binPath} --context=${projectPath} --config=${configPath}`)
