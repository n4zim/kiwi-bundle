"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebpackMode;
(function (WebpackMode) {
    WebpackMode["PRODUCTION"] = "production";
    WebpackMode["DEVELOPMENT"] = "development";
})(WebpackMode = exports.WebpackMode || (exports.WebpackMode = {}));
var WebpackConfig = (function () {
    function WebpackConfig(commmonOrParams) {
        if (Array.isArray(commmonOrParams)) {
            this.common = commmonOrParams;
        }
        else {
            this.common = commmonOrParams.common;
            this.development = commmonOrParams.development;
            this.production = commmonOrParams.production;
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
