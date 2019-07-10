"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function stringsByLanguage(languages) {
    return function (language, count) {
        if (typeof languages[language] === "string") {
            return languages[language];
        }
        if (typeof languages[language] === "function") {
            return languages[language](language, count);
        }
        return "";
    };
}
exports.default = stringsByLanguage;
