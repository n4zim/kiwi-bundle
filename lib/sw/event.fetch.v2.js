"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var utils_1 = require("./utils");
var onNotCachedRessource = function (event, request, cache, splitedPath) {
    var networkFetch = fetch(request);
    event.waitUntil(networkFetch.then(function (networkResponse) {
        utils_1.log("onNotCachedRessource - put", request.url);
        return cache.put(request, networkResponse.clone()).then(function () {
            utils_1.cleanCache(cache, splitedPath);
        });
    }));
    return networkFetch;
};
var informClientIfUpdated = function (original, latest) {
    return new Promise(function (resolve) {
        if (typeof latest !== "undefined" && latest.headers.get("ETag") !== original.headers.get("ETag")) {
            self.clients.matchAll().then(function (clients) {
                utils_1.log("asked for client update");
                clients.forEach(function (client) {
                    client.postMessage({ type: types_1.WorkerMessageType.CACHE });
                });
                resolve();
            });
        }
        else {
            resolve();
        }
    });
};
var onCachedRessource = function (event, request, cache, cacheResponse, splitedPath) {
    event.waitUntil(fetch(request)
        .then(function (networkResponse) {
        utils_1.log("onCachedRessource - put", request.url);
        return cache.put(request, networkResponse.clone()).then(function () {
            return cache.match(request).then(function (newCacheResponse) {
                return informClientIfUpdated(cacheResponse, newCacheResponse).then(function () {
                    utils_1.cleanCache(cache, splitedPath);
                });
            });
        });
    })
        .catch(function () {
        utils_1.log("offline mode");
    }));
    return cacheResponse;
};
var fetchResponse = function (event, request, splitedPath) {
    return caches.open("offline").then(function (cache) {
        return cache.match(request).then(function (cacheResponse) {
            if (typeof cacheResponse === "undefined") {
                utils_1.log("load - network first", request.url);
                return onNotCachedRessource(event, request, cache, splitedPath);
            }
            else {
                utils_1.log("load - cache first", request.url);
                return onCachedRessource(event, request, cache, cacheResponse, splitedPath);
            }
        });
    });
};
exports.default = (function (event) {
    if (event.request.method === "GET") {
        var splitedPath = utils_1.getSplitedPath(event.request.url);
        if (utils_1.isRessourceAccepted(splitedPath)) {
            if (event.request.destination === "document" && splitedPath[0].length !== 0) {
                event.respondWith(fetchResponse(event, utils_1.convertRequestToRootDocument(event.request), [""]));
                utils_1.log("fetch forward", event.request.url);
            }
            else {
                event.respondWith(fetchResponse(event, event.request, splitedPath));
            }
        }
    }
});
