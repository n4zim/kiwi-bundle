"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackMode;
(function (WebpackMode) {
    WebpackMode["PRODUCTION"] = "production";
    WebpackMode["DEVELOPMENT"] = "development";
})(WebpackMode = exports.WebpackMode || (exports.WebpackMode = {}));
var WebpackConfig = (function () {
    function WebpackConfig(commonOrParams) {
        if (Array.isArray(commonOrParams)) {
            this.common = commonOrParams;
        }
        else {
            this.common = commonOrParams.common;
            this.development = commonOrParams.development;
            this.production = commonOrParams.production;
        }
    }
    WebpackConfig.prototype.generate = function (mode) {
        if (Array.isArray(this.common)) {
            return this.common;
        }
        else {
            var final = [];
            if (typeof this.common !== "undefined") {
                final = this.common();
            }
            if (mode === WebpackMode.DEVELOPMENT) {
                if (typeof this.development !== "undefined") {
                    final = final.concat(this.development());
                }
            }
            else if (mode === WebpackMode.PRODUCTION) {
                if (typeof this.production !== "undefined") {
                    final = final.concat(this.production());
                }
            }
            return final;
        }
    };
    return WebpackConfig;
}());
exports.default = WebpackConfig;
