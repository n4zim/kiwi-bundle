"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.default = (function (event) {
    self.skipWaiting();
    event.waitUntil(fetch("/static/kiwi.json")
        .then(function (kiwiJsonResponse) {
        return kiwiJsonResponse.json().then(function (kiwiJson) {
            return caches.open("offline").then(function (cache) {
                return Promise.all(Object.keys(kiwiJson).map(function (file) {
                    return cache.add(file).then(function () {
                        utils_1.cleanCache(cache, file.split("/").slice(1));
                    });
                }));
            });
        });
    })
        .catch(function () {
        utils_1.log("offline mode");
    }));
    utils_1.log("install");
});
