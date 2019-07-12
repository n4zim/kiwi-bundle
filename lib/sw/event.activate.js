"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.default = (function (event) {
    event.waitUntil(self.clients.claim());
    utils_1.log("activate");
});
