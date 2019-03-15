"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var utils_1 = require("./utils");
var onCacheMessage = function (event) {
    return caches.open("offline").then(function (cache) {
        cache.addAll([
            "/",
            "/static/icons/favicon.ico",
            "/static/icons/manifest.json",
        ]);
        event.data.scripts.forEach(function (file) {
            var split = utils_1.getSplitedPath(file);
            if (utils_1.isRessourceAccepted(split)) {
                utils_1.log("message - force cache", file);
                cache.add(file).then(function () {
                    utils_1.cleanCache(cache, split);
                });
            }
        });
    });
};
var onChangeMessage = function (event) {
    return self.clients.matchAll().then(function (clients) {
        clients.forEach(function (client) {
            if (client.id !== event.source.id) {
                client.postMessage(event.data);
            }
        });
        utils_1.log("message - change");
    });
};
exports.default = (function (event) {
    if (event.data.type === types_1.WorkerMessageType.CACHE) {
        event.waitUntil(onCacheMessage(event));
    }
    else if (event.data.type === types_1.WorkerMessageType.CHANGE) {
        event.waitUntil(onChangeMessage(event));
    }
});
