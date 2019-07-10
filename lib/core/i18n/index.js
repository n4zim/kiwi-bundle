"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NameString_1 = __importDefault(require("../names/NameString"));
function i18nString(count, vars) {
    return function () { return NameString_1.default(); };
}
exports.i18nString = i18nString;
