"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_1 = require("mobx");
var Store = (function () {
    function Store(name) {
        this.items = [];
        this.currentItem = "";
        this.name = name;
    }
    Store.prototype.changeCurrentItem = function (value) {
        this.currentItem = value;
    };
    Store.prototype.addCurrentItem = function () {
        this.items.push(this.currentItem);
        this.currentItem = "";
    };
    Store.prototype.reset = function () {
        this.items = [];
        this.currentItem = "";
    };
    __decorate([
        mobx_1.observable
    ], Store.prototype, "items", void 0);
    __decorate([
        mobx_1.observable
    ], Store.prototype, "currentItem", void 0);
    __decorate([
        mobx_1.action
    ], Store.prototype, "changeCurrentItem", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "addCurrentItem", null);
    __decorate([
        mobx_1.action
    ], Store.prototype, "reset", null);
    return Store;
}());
exports.Store = Store;
