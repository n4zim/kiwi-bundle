"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ENABLE_LOGGER = false;
exports.log = function (title) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (ENABLE_LOGGER) {
        console.log.apply(console, ["ServiceWorker (" + title + ")"].concat(args));
    }
};
exports.getSplitedPath = function (request) {
    var path = /^https?\:\/\/(?:.*?)\/(.*)$/.exec(request);
    if (path !== null && path.length === 2) {
        return path[1].split("/");
    }
    else {
        return [];
    }
};
exports.isRessourceAccepted = function (splitedPath) {
    return splitedPath.length >= 1
        && splitedPath[0] !== "sockjs-node"
        && !/^.*\.hot-update.js(on)?$/.test(splitedPath[0]);
};
exports.convertRequestToRootDocument = function (request) {
    var splitedUrl = request.url.split("/");
    return new Request(splitedUrl[0] + "//" + splitedUrl[2] + "/", {
        cache: request.cache, credentials: request.credentials, headers: request.headers,
        integrity: request.integrity, keepalive: request.keepalive, method: "GET",
        redirect: request.redirect, referrer: request.referrer,
        referrerPolicy: request.referrerPolicy, signal: request.signal,
    });
};
var getAssetNameWithHash = function (splitedPath) {
    var data = /^(.*?)\.[0-9a-z]+\.js$/.exec(splitedPath[1]);
    if (data !== null && data.length === 2) {
        return data[1];
    }
    else {
        return null;
    }
};
exports.cleanCache = function (cache, splitedPath) {
    if (splitedPath.length === 2 && splitedPath[0] === "static") {
        var hashAssetName_1 = getAssetNameWithHash(splitedPath);
        if (hashAssetName_1 !== null) {
            exports.log("clear cache", hashAssetName_1);
            cache.matchAll().then(function (results) {
                results.forEach(function (result) {
                    var resultSplitedPath = exports.getSplitedPath(result.url);
                    if (resultSplitedPath.length === 2
                        && splitedPath[1] !== resultSplitedPath[1]
                        && resultSplitedPath[0] === "static"
                        && new RegExp("^" + hashAssetName_1 + ".[0-9a-z]+.js$").test(resultSplitedPath[1])) {
                        cache.delete(result.url);
                    }
                });
            });
        }
    }
};
