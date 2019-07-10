"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringsByLanguage(languages) {
    return function (language, count, vars) {
        if (typeof languages[language] === "string") {
            return languages[language];
        }
        if (typeof languages[language] === "function") {
            return languages[language](language, count, vars);
        }
        return "";
    };
}
exports.default = stringsByLanguage;
