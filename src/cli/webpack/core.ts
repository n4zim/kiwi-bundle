
export enum WebpackMode {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
}

type WebpackCallback = () => any[]


interface WebpackConfigParams {
  common?: any[]|WebpackCallback
  development?: WebpackCallback
  production?: WebpackCallback
}

export default class WebpackConfig implements WebpackConfigParams {
  common?: any[]|WebpackCallback
  development?: WebpackCallback
  production?: WebpackCallback

  constructor(commmonOrParams: any[]|WebpackConfigParams) {
    if(Array.isArray(commmonOrParams)) {
      this.common = commmonOrParams
    } else {
      this.common = commmonOrParams.common
      this.development = commmonOrParams.development
      this.production = commmonOrParams.production
    }
  }

  generate(mode: WebpackMode) {
    if(Array.isArray(this.common)) {
      return this.common
    } else {
      let final = []
      if(typeof this.common !== "undefined") {
        final = this.common()
      }
      if(mode === WebpackMode.DEVELOPMENT) {
        if(typeof this.development !== "undefined") {
          final = final.concat(this.development())
        }
      } else if(mode === WebpackMode.PRODUCTION) {
        if(typeof this.production !== "undefined") {
          final = final.concat(this.production())
        }
      }
      return final
    }
  }

}
