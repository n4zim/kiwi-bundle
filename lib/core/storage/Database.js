"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../client/logger"));
var Database = (function () {
    function Database(name, repositories) {
        var _this = this;
        this.name = name;
        this.repositories = repositories;
        var databaseRequest = window.indexedDB.open(name, 1);
        databaseRequest.onerror = function () {
            logger_1.default.logError(_this, "IndexDB error", event);
        };
        databaseRequest.onupgradeneeded = function () {
            if (databaseRequest.result) {
                _this.onUpgradeNeeded(databaseRequest.result);
            }
        };
        databaseRequest.onsuccess = function () {
            logger_1.default.logSuccess(_this, "IndexedDB connected", event);
            _this.onSuccess(databaseRequest.result);
        };
    }
    Database.prototype.onUpgradeNeeded = function (database) {
        var _this = this;
        this.repositories.forEach(function (repository) {
            if (!database.objectStoreNames.contains(repository.name)) {
                var store = database.createObjectStore(repository.name, { keyPath: "id" });
                store.createIndex("createdAt", "createdAt");
                store.createIndex("updatedAt", "updatedAt");
                logger_1.default.logInfo(_this, "Created " + repository.name + " store");
            }
        });
    };
    Database.prototype.onSuccess = function (database) {
        var _this = this;
        var check = this.repositories.length;
        this.repositories.forEach(function (repository) {
            repository.init(database);
            logger_1.default.logInfo(repository, "Repository for " + _this.name + " loaded");
            if (--check === 0) {
                logger_1.default.logInfo(_this, _this.repositories.length + " repositor" + (_this.repositories.length === 1 ? "y" : "ies") + " has been loaded");
            }
        });
    };
    return Database;
}());
exports.default = Database;
