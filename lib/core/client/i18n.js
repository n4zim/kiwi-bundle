"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dropin_recipes_1 = require("dropin-recipes");
var _1 = require(".");
exports.currentLanguage = navigator.language.slice(0, 2);
function i18n(name, count, vars) {
    if (count === void 0) { count = 1; }
    if (vars === void 0) { vars = {}; }
    var output = dropin_recipes_1.convertNameToString(exports.currentLanguage, name, count, vars);
    if (output === null) {
        _1.logger.logError("i18n", "Unknown i18n data type");
        return "";
    }
    return output;
}
exports.i18n = i18n;
