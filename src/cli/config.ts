import { platform } from "os";

const packageJson = require('../../package.json')

enum Platform {
  WEB = 'web',
  ANDROID = 'android',
  IOS = 'ios',
  LINUX = 'linux',
  WINDOWS = 'windows',
  MAC = 'mac',
}

interface ConfigParams {
  version: number
  platforms: Platform[]
}

class Config implements ConfigParams {
  version: number
  platforms: Platform[]
  constructor(json?: ConfigParams) {
    if(typeof json === 'undefined') {
      this.version = packageJson.version
      this.platforms = packageJson.platforms
    } else {
      this.version = json.version
      this.platforms = [ Platform.WEB ]
    }
  }
}
