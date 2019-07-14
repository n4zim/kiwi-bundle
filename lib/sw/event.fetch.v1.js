"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var fetchAndCache = function (cache, request, splitedPath) {
    return fetch(request).then(function (networkResponse) {
        return cache.put(request, networkResponse.clone()).then(function () {
            utils_1.cleanCache(cache, splitedPath);
            return cache.match(request);
        });
    });
};
var fetchDocResponse = function (cache, request, splitedPath) {
    return fetch("/static/kiwi.json")
        .then(function (kiwiJsonResponse) {
        utils_1.log("fetch - online", request.url);
        return kiwiJsonResponse.json().then(function (kiwiJson) {
            var oldETag = kiwiJson["/" + splitedPath.join("/")];
            return cache.match(request).then(function (cacheResponse) {
                if (typeof cacheResponse === "undefined" || cacheResponse.headers.get("ETag") !== oldETag) {
                    return fetchAndCache(cache, request, splitedPath);
                }
                else {
                    return cacheResponse;
                }
            });
        });
    })
        .catch(function (error) {
        console.log("ERROR", error);
        utils_1.log("fetch - offline", request.url);
        return cache.match(request);
    });
};
var fetchAssetResponse = function (cache, request, splitedPath) {
    return cache.match(request).then(function (cacheResponse) {
        if (typeof cacheResponse === "undefined") {
            return fetchAndCache(cache, request, splitedPath);
        }
        else {
            return cacheResponse;
        }
    });
};
exports.default = (function (event) {
    if (event.request.method === "GET") {
        var splitedPath_1 = utils_1.getSplitedPath(event.request.url);
        if (utils_1.isRessourceAccepted(splitedPath_1)) {
            event.respondWith(caches.open("offline").then(function (cache) {
                if (event.request.destination === "document") {
                    if (splitedPath_1[0].length !== 0) {
                        utils_1.log("fetch forward", event.request.url);
                        return fetchDocResponse(cache, utils_1.convertRequestToRootDocument(event.request), [""]);
                    }
                    else {
                        return fetchDocResponse(cache, event.request, splitedPath_1);
                    }
                }
                else {
                    return fetchAssetResponse(cache, event.request, splitedPath_1);
                }
            }));
        }
    }
});
