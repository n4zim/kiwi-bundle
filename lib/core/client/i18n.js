"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dropin_recipes_1 = require("dropin-recipes");
exports.currentLanguage = dropin_recipes_1.stringToLanguage(navigator.language.slice(0, 2));
function i18n(name, count, vars) {
    if (count === void 0) { count = 1; }
    if (vars === void 0) { vars = {}; }
    return dropin_recipes_1.nameToString(name, { language: exports.currentLanguage, count: count, vars: vars });
}
exports.i18n = i18n;
