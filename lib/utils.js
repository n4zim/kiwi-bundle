"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueHash = function () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
exports.actionWithObjectKey = function (object, key, action) {
    if (typeof object !== "undefined" && typeof object[key] !== "undefined") {
        action(object[key]);
    }
};
