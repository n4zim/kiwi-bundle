"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var logger_1 = __importDefault(require("../logger"));
var WebComponent = (function (_super) {
    __extends(WebComponent, _super);
    function WebComponent(props) {
        return _super.call(this, props) || this;
    }
    WebComponent.prototype.componentDidMount = function () {
        logger_1.default.logView(this, "Mounted");
    };
    WebComponent.prototype.componentDidUpdate = function () {
        logger_1.default.logView(this, "Update");
    };
    return WebComponent;
}(react_1.Component));
exports.default = WebComponent;
