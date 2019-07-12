"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../client/logger"));
exports.currentLanguage = navigator.language.slice(0, 2);
var execute = function (data) {
    return "EXECUTE";
};
function i18n(data, count, vars) {
    if (count === void 0) { count = 1; }
    if (vars === void 0) { vars = {}; }
    if (typeof data === "string") {
        return data;
    }
    if (typeof data === "object") {
        return execute(data);
    }
    if (typeof data === "function") {
        if (exports.currentLanguage !== null) {
            return data(exports.currentLanguage, count);
        }
        else {
            return "";
        }
    }
    logger_1.default.logError("i18n", "Unknown i18n data type");
    return "";
}
exports.default = i18n;
