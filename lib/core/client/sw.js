"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../sw/types");
var logger_1 = __importDefault(require("./logger"));
var ServiceWorkerClient = (function () {
    function ServiceWorkerClient() {
        var _this = this;
        this.isCompatible = "serviceWorker" in navigator;
        this.changesHooks = {};
        if (this.isCompatible) {
            navigator.serviceWorker.onmessage = function (event) {
                if (event.data.type === types_1.WorkerMessageType.CACHE) {
                    _this.onCacheMessage(event.data);
                }
                else if (event.data.type === types_1.WorkerMessageType.CHANGE) {
                    _this.onChangeMessage(event.data);
                }
            };
            if ("caches" in window) {
                navigator.serviceWorker.oncontrollerchange = function () {
                    logger_1.default.logSuccess("ServiceWorker", "Changed controller");
                    caches.open("offline").then(function (cache) {
                        cache.keys().then(function (keys) {
                            if (keys.length === 0) {
                                _this.forceCacheUpdate();
                            }
                        });
                    });
                };
            }
        }
        this.load();
    }
    ServiceWorkerClient.prototype.load = function () {
        if (this.isCompatible) {
            navigator.serviceWorker.register("/" + window.kiwi.sw, {
                scope: window.location.origin,
            }).then(function () {
                navigator.serviceWorker.ready.then(function () {
                    logger_1.default.logSuccess("ServiceWorker", "Loaded");
                });
            });
        }
    };
    ServiceWorkerClient.prototype.forceCacheUpdate = function () {
        var scripts = [];
        document.querySelectorAll("script").forEach(function (script) {
            if (script.src.length !== 0)
                scripts.push(script.src);
        });
        this.postMessage({
            type: types_1.WorkerMessageType.CACHE,
            scripts: scripts,
        });
    };
    ServiceWorkerClient.prototype.postMessage = function (message) {
        var controller = navigator.serviceWorker.controller;
        if (controller !== null) {
            return controller.postMessage(message);
        }
        else {
            return null;
        }
    };
    ServiceWorkerClient.prototype.onCacheMessage = function (message) {
        if (typeof module.hot === "undefined") {
            window.location.reload();
        }
    };
    ServiceWorkerClient.prototype.onChangeMessage = function (message) {
        var hook = this.changesHooks[message.database + "-" + message.store];
        if (typeof hook !== "undefined")
            hook(message.entity);
    };
    ServiceWorkerClient.prototype.propagateChanges = function (type, databaseName, storeName, entity) {
        this.postMessage({
            type: types_1.WorkerMessageType.CHANGE,
            change: type,
            database: databaseName,
            store: storeName,
            entity: entity,
        });
    };
    ServiceWorkerClient.prototype.addChangesHook = function (database, store, action) {
        this.changesHooks[database + "-" + store] = action;
    };
    return ServiceWorkerClient;
}());
exports.default = new ServiceWorkerClient();
