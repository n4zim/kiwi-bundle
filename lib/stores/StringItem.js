"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringItem = (function () {
    function StringItem(stores) {
        var _this = this;
        this.indexes = {};
        this.list = stores;
        stores.forEach(function (store, index) {
            _this.indexes[store.name] = index;
        });
    }
    return StringItem;
}());
exports.default = StringItem;
