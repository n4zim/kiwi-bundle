"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NameString = (function () {
    function NameString(name) {
        this.name = "";
        this.name = name;
    }
    NameString.prototype.get = function () {
        return this.name;
    };
    return NameString;
}());
exports.default = NameString;
