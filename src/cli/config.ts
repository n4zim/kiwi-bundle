const packageJson = require('../../package.json')

enum Platform {
  WEB = 'web',
  ANDROID = 'android',
  IOS = 'ios',
  LINUX = 'linux',
  WINDOWS = 'windows',
  MACOS = 'macos',
}

interface ConfigParams {
  version: string
  platforms: Platform[]
}

class Config implements ConfigParams {
  version: string
  platforms: Platform[]

  constructor(json?: ConfigParams) {
    if(typeof json === 'undefined') {
      this.version = packageJson.version
      this.platforms = [ Platform.WEB ]
    } else {
      this.version = json.version
      this.platforms = json.platforms
    }
  }

  write(projectDir: string) {
    console.log(projectDir, JSON.stringify(this))
  }
}

export {
  Config as default,
  ConfigParams,
  Platform,
}
