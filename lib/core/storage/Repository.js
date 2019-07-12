"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../client/logger"));
var sw_1 = __importDefault(require("../client/sw"));
var types_1 = require("../../sw/types");
var Repository = (function () {
    function Repository(params) {
        this.localCallsQueue = [];
        this.hooksQueue = [];
        this.swCallsQueue = [];
        this.name = params.name;
        this.version = params.version;
        this.generateEntity = params.generateEntity;
        logger_1.default.logInfo(this, "Loaded " + this.name + " entities");
    }
    Repository.prototype.handleRequest = function (request) {
        return new Promise(function (resolve, reject) {
            request.onsuccess = function () {
                resolve(request.result);
            };
            request.onerror = function () {
                reject(request);
            };
        });
    };
    Repository.prototype.generateRequest = function (database, requestCall) {
        var store = database.transaction(this.name, "readwrite").objectStore(this.name);
        return this.handleRequest(requestCall(store));
    };
    Repository.prototype.execute = function (requestCall) {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof _this.database !== "undefined") {
                resolve(_this.generateRequest(_this.database, requestCall));
            }
            else {
                _this.localCallsQueue.push(function () {
                    resolve(_this.execute(requestCall));
                });
            }
        });
    };
    Repository.prototype.propagateToServiceWorker = function (type, entity) {
        if (typeof this.database !== "undefined") {
            sw_1.default.propagateChanges(type, this.database.name, this.name, entity);
        }
        else {
            this.swCallsQueue({ type: type, entity: entity });
        }
    };
    Repository.prototype.init = function (database) {
        var _this = this;
        this.database = database;
        this.localCallsQueue.map(function (execute) {
            execute();
        });
        this.swCallsQueue.map(function (call) {
            _this.propagateToServiceWorker(call.type, call.entity);
        });
        this.hooksQueue.map(function (hook) {
            sw_1.default.addChangesHook(database.name, _this.name, function (entity) {
                hook(entity);
            });
        });
    };
    Repository.prototype.findAll = function () {
        return this.execute(function (store) { return store.index("updatedAt").getAll(); });
    };
    Repository.prototype.forEach = function (action) {
        this.findAll().then(function (entities) {
            entities.forEach(function (entity) {
                action(entity);
            });
        });
    };
    Repository.prototype.create = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            var entity = _this.generateEntity({ data: data });
            resolve(entity);
            _this.execute(function (store) { return store.put(entity); }).then(function () {
                logger_1.default.logSuccess(_this, "New " + _this.name + " record", entity);
                _this.propagateToServiceWorker(types_1.WorkerMessageChangeType.CREATE, entity);
            }).catch(function (error) {
                logger_1.default.logError(_this, "Record " + _this.name + " not saved", error, entity);
            });
        });
    };
    Repository.prototype.watchForNewEntries = function (action) {
        this.hooksQueue.push(action);
    };
    return Repository;
}());
exports.default = Repository;
