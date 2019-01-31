"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Stores = (function () {
    function Stores(stores) {
        var _this = this;
        this.indexes = {};
        this.list = stores;
        stores.forEach(function (store, index) {
            _this.indexes[store.name] = index;
        });
    }
    return Stores;
}());
exports.default = Stores;
