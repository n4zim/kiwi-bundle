"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var Entity = (function () {
    function Entity(params, empty) {
        this.data = params.data;
        if (typeof params !== "undefined") {
            if (typeof params.id !== "undefined") {
                this.id = params.id;
            }
            else if (typeof this.id === "undefined") {
                this.id = utils_1.uniqueHash();
            }
            if (typeof params.createdAt === "undefined") {
                var date = new Date();
                this.createdAt = date;
                this.updatedAt = date;
            }
        }
    }
    return Entity;
}());
exports.Entity = Entity;
