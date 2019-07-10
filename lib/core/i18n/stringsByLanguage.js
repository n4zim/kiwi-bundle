"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../client/logger"));
function stringsByLanguage(languages) {
    return function (language, count) {
        if (typeof languages[language] === "string") {
            return languages[language];
        }
        if (typeof languages[language] === "function") {
            return languages[language](language, count);
        }
        logger_1.default.logError("i18n", "Unknown stringsByLanguage data type");
        return "";
    };
}
exports.default = stringsByLanguage;
