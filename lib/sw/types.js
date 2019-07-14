"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkerMessageType;
(function (WorkerMessageType) {
    WorkerMessageType[WorkerMessageType["CACHE"] = 0] = "CACHE";
    WorkerMessageType[WorkerMessageType["CHANGE"] = 1] = "CHANGE";
})(WorkerMessageType = exports.WorkerMessageType || (exports.WorkerMessageType = {}));
var WorkerMessageChangeType;
(function (WorkerMessageChangeType) {
    WorkerMessageChangeType[WorkerMessageChangeType["CREATE"] = 0] = "CREATE";
    WorkerMessageChangeType[WorkerMessageChangeType["UPDATE"] = 1] = "UPDATE";
    WorkerMessageChangeType[WorkerMessageChangeType["DELETE"] = 2] = "DELETE";
})(WorkerMessageChangeType = exports.WorkerMessageChangeType || (exports.WorkerMessageChangeType = {}));
