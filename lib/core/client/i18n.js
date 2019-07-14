"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dropin_recipes_1 = require("dropin-recipes");
var _1 = require(".");
exports.currentLanguage = navigator.language.slice(0, 2);
function i18n(data, count, vars) {
    if (count === void 0) { count = 1; }
    if (vars === void 0) { vars = {}; }
    if (typeof data === "string") {
        return data;
    }
    var current = "";
    if (typeof data === "object") {
        if (typeof data[dropin_recipes_1.Languages.ANY] !== "undefined") {
            current = data[dropin_recipes_1.Languages.ANY];
        }
        else if (typeof data[exports.currentLanguage] !== "undefined") {
            current = data[exports.currentLanguage];
        }
        if (typeof current === "object") {
            if (count === 1) {
                if (typeof current.one !== "undefined") {
                    return current.one;
                }
            }
            else if (typeof current.many !== "undefined") {
                return current.many;
            }
        }
    }
    else {
        _1.logger.logError("i18n", "Unknown i18n data type");
    }
    return current;
}
exports.i18n = i18n;
