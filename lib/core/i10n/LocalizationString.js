"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalizationString = (function () {
    function LocalizationString(text) {
        this.string = "";
        this.string = text;
    }
    LocalizationString.prototype.get = function () {
        return this.string;
    };
    return LocalizationString;
}());
exports.default = LocalizationString;
