"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var event_install_v1_1 = __importDefault(require("./event.install.v1"));
var event_activate_1 = __importDefault(require("./event.activate"));
var event_fetch_v1_1 = __importDefault(require("./event.fetch.v1"));
var event_message_v1_1 = __importDefault(require("./event.message.v1"));
self.addEventListener("install", event_install_v1_1.default);
self.addEventListener("activate", event_activate_1.default);
self.addEventListener("fetch", event_fetch_v1_1.default);
self.addEventListener("message", event_message_v1_1.default);
