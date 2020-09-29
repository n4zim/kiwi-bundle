import { Environment } from "../Context/Fields/Environment"
import { l4r } from "./l4r"
import { i18n } from "./i18n"
import { i18nLogger } from "../../i18n/Logger"

// tslint:disable-next-line: class-name
export class l4rSettings {
  static mode: Environment = Environment.PRODUCTION

  static enableDevelopmentMode() {
    if(this.mode === Environment.DEVELOPMENT) {
      l4r.warning(this, i18n(i18nLogger.modeAlreadyEnabled(Environment.DEVELOPMENT)))
    } else {
      this.mode = Environment.DEVELOPMENT
      l4r.success(this, i18n(i18nLogger.modeChanged(Environment.DEVELOPMENT)))
    }
  }

  static enableProductionMode() {
    if(this.mode === Environment.PRODUCTION) {
      l4r.error(this, i18n(i18nLogger.modeAlreadyEnabled(Environment.PRODUCTION)))
    } else {
      l4r.info(this, i18n(i18nLogger.modeChanged(Environment.PRODUCTION)))
      this.mode = Environment.PRODUCTION
    }
  }

  static isCurrentMode(mode: Environment) {
    return this.mode === mode
  }

}
