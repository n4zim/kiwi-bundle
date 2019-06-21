"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Request = (function () {
    function Request() {
    }
    Request.request = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fetch(_this.URL + path).then(function (result) { return result.json(); }).then(function (result) {
                if (typeof result.error === "undefined") {
                    resolve(result);
                }
                else {
                    reject(result);
                }
            }, reject);
        });
    };
    Request.getDocument = function (recipe, document) {
        return this.request("recipes/" + recipe + "/documents/" + document);
    };
    Request.getLines = function (recipe, collection, filters) {
        return this.request("recipes/" + recipe + "/collections/" + collection + "/lines");
    };
    Request.URL = "http://localhost:8040/";
    return Request;
}());
exports.Request = Request;
