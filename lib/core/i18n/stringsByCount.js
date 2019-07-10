"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../client/logger"));
function stringsByCount(data) {
    return function (language, count) {
        if (count !== 1) {
            if (typeof data.one !== "undefined") {
                return data.one;
            }
        }
        else {
            if (typeof data.many !== "undefined") {
                return data.many;
            }
        }
        logger_1.default.logError("i18n", "Missing stringsByCount for a count of " + count);
        return "";
    };
}
exports.default = stringsByCount;
